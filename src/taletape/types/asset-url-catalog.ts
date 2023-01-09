export default interface AssetUrlCatalog {
	fonts?: {
		[fontKey: string]: string;
	};
	images?: {
		[imageKey: string]: string;
	};
}
