export class FontLoader {
	loadedFontFacePromises: Partial<Record<string, Promise<FontFace>>>;

	constructor() {
		this.loadedFontFacePromises = {};
	}

	loadFont(
		fontKey: string,
		fontUrl: string,
		fontFaceDescriptors: FontFaceDescriptors
	): Promise<void> {
		let loadedFontFacePromise = this.loadedFontFacePromises[fontKey];

		if (loadedFontFacePromise == null) {
			const fontFace = new FontFace(
				fontKey,
				`url(${fontUrl})`,
				fontFaceDescriptors
			);

			loadedFontFacePromise = fontFace.load().then(() => {
				document.fonts.add(fontFace);

				return fontFace;
			});

			this.loadedFontFacePromises[fontKey] = loadedFontFacePromise;
		}

		return loadedFontFacePromise.then(() => undefined);
	}

	unloadFont(fontKey: string): Promise<void> {
		const loadedFontFacePromise = this.loadedFontFacePromises[fontKey];

		if (loadedFontFacePromise == null) {
			return Promise.resolve();
		}

		return loadedFontFacePromise.then((fontFace) => {
			document.fonts.delete(fontFace);

			delete this.loadedFontFacePromises[fontKey];

			return;
		});
	}
}
