export class FontAgentCoordinator {
	protected readonly fontAgents: Partial<Record<string, FontAgent>>;

	constructor() {
		this.fontAgents = {};
	}

	mountFont(
		fontKey: string,
		fontFamily: string,
		fontFaceDescriptors: FontFaceDescriptors,
		fontBlob: Blob
	): Promise<void> {
		let fontAgent = this.fontAgents[fontKey];

		if (fontAgent == null) {
			fontAgent = new FontAgent(fontFamily, fontFaceDescriptors, fontBlob);
		}

		return fontAgent.mountFont();
	}

	unmountAllFonts(): Promise<void> {
		const fontIsUnmountedPromises = Object.keys(this.fontAgents).map(
			(fontKey) => this.unmountFont(fontKey)
		);

		return Promise.all(fontIsUnmountedPromises).then(() => undefined);
	}

	unmountFont(fontKey: string): Promise<void> {
		const fontAgent = this.fontAgents[fontKey];

		if (fontAgent == null) {
			return Promise.resolve();
		}

		return fontAgent.unmountFont();
	}
}

class FontAgent {
	protected readonly fontFamily: string;
	protected readonly fontFaceDescriptors: FontFaceDescriptors;

	protected loadedFontFacePromise: Promise<FontFace> | null;

	private readonly fontBlob: Blob;

	constructor(
		fontFamily: string,
		fontFaceDescriptors: FontFaceDescriptors,
		fontBlob: Blob
	) {
		this.fontFamily = fontFamily;
		this.fontFaceDescriptors = fontFaceDescriptors;

		this.fontBlob = fontBlob;

		this.loadedFontFacePromise = null;
	}

	mountFont(): Promise<void> {
		let loadedFontFacePromise = this.loadedFontFacePromise;

		if (loadedFontFacePromise == null) {
			const fontObjectUrl = URL.createObjectURL(this.fontBlob);

			const fontFace = new FontFace(
				this.fontFamily,
				`url(${fontObjectUrl})`,
				this.fontFaceDescriptors
			);

			loadedFontFacePromise = fontFace.load().then(() => {
				URL.revokeObjectURL(fontObjectUrl);

				document.fonts.add(fontFace);

				return fontFace;
			});

			this.loadedFontFacePromise = loadedFontFacePromise;
		}

		return loadedFontFacePromise.then(() => undefined);
	}

	unmountFont(): Promise<void> {
		if (this.loadedFontFacePromise == null) {
			return Promise.resolve();
		}

		return this.loadedFontFacePromise.then((fontFace) => {
			document.fonts.delete(fontFace);

			this.loadedFontFacePromise = null;

			return;
		});
	}
}
