interface AssetBase {
	type: string;
	url: string;
}

interface FontAsset extends AssetBase {
	type: 'font';
	fontFamily: string;
	fontFaceDescriptors: FontFaceDescriptors;
}

interface ImageAsset extends AssetBase {
	type: 'image';
}

type AssetUnion = FontAsset | ImageAsset;

export default AssetUnion;
