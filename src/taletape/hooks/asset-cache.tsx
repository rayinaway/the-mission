import * as React from 'react';

import AssetRecord from '~/src/taletape/types/asset-record';
import {AssetCache} from '~/src/taletape/utils/asset';

interface ProviderPropCollection {
	assets?: AssetRecord;
	onAssetCacheLoad?: (assetCache: AssetCache) => void;
	onAssetCacheLoadError?: (error: Error) => void;
	children: React.ReactNode;
}

type AssetCacheContextValue = AssetCache | null;

const AssetCacheContext = React.createContext<AssetCacheContextValue>(null);

export function AssetCacheProvider({
	assets,
	children,
	onAssetCacheLoad,
	onAssetCacheLoadError
}: ProviderPropCollection): React.ReactElement {
	const assetCacheRef = React.useRef<AssetCache | null>(null);

	React.useEffect(wireUpAssetCache, [
		assets,
		onAssetCacheLoad,
		onAssetCacheLoadError
	]);

	return (
		<AssetCacheContext.Provider value={assetCacheRef.current}>
			{children}
		</AssetCacheContext.Provider>
	);

	function wireUpAssetCache(): (() => void) | void {
		if (assets == null) {
			return;
		}

		const assetCache =
			assetCacheRef.current != null
				? assetCacheRef.current
				: new AssetCache(assets);

		assetCache
			.load()
			.then(() => {
				onAssetCacheLoad?.(assetCache);

				return;
			})
			.catch((reason) => {
				if (reason instanceof Error) {
					onAssetCacheLoadError?.(reason);
				}
			});

		assetCacheRef.current = assetCache;

		return () => {
			assetCache.unload();
		};
	}
}

export function useAssetCache(): AssetCacheContextValue {
	return React.useContext(AssetCacheContext);
}
