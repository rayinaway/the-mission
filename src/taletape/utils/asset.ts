import AssetRecord from '~/src/taletape/types/asset-record';
import AssetUnion from '~/src/taletape/types/asset-union';

interface AssetContainer {
	asset: AssetUnion;
	blob: Blob;
}

export class AssetCache {
	protected readonly assets: AssetRecord;

	protected responsesPromise: Promise<Partial<Record<string, Response>>> | null;

	constructor(assets: AssetRecord) {
		this.assets = assets;

		this.responsesPromise = null;
	}

	getAssetContainer(assetKey: string): Promise<AssetContainer | undefined> {
		if (this.responsesPromise == null) {
			return Promise.reject(
				new Error('The queried AssetCache has not been instructed to load.')
			);
		}

		return this.responsesPromise
			.then((responses) => {
				const response = responses[assetKey];

				if (response == null) {
					return;
				}

				return response.blob();
			})
			.then((blob) => {
				const asset = this.assets[assetKey];

				if (asset == null || blob == null) {
					return undefined;
				}

				return {asset, blob};
			});
	}

	load(): Promise<void> {
		let responsesPromise = this.responsesPromise;

		if (responsesPromise == null) {
			const responses: Partial<Record<string, Response>> = {};

			const responsePromises: Array<Promise<Response>> = [];

			Object.entries(this.assets).forEach(([assetKey, asset]) => {
				if (asset == null) {
					return;
				}

				const responsePromise = fetch(asset.url).then((response) => {
					responses[assetKey] = response;

					return response;
				});

				responsePromises.push(responsePromise);
			});

			responsesPromise = Promise.all(responsePromises).then(() => responses);

			this.responsesPromise = responsesPromise;
		}

		return responsesPromise.then(() => undefined);
	}

	unload(): void {
		this.responsesPromise = null;
	}
}
