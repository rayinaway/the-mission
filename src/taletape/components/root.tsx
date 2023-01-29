import * as React from 'react';

import {AssetCacheProvider} from '~/src/taletape/hooks/asset-cache';
import AssetRecord from '~/src/taletape/types/asset-record';
import Scenario from '~/src/taletape/types/scenario';
import {AssetCache} from '~/src/taletape/utils/asset';
import {FontAgentCoordinator} from '~/src/taletape/utils/font';

interface PropCollection {
	scenario: Scenario;
	assets?: AssetRecord;
}

type AssetStatusUnion = 'pending' | 'ready' | 'scheduled' | 'unavailable';

export default function Taletape({
	assets,
	scenario
}: PropCollection): React.ReactElement {
	const fontAgentCoordinatorRef = React.useRef<FontAgentCoordinator | null>(
		null
	);

	const [assetStatus, setAssetStatus] =
		React.useState<AssetStatusUnion>('pending');

	const discardAssetsMemoized = React.useCallback(discardAssets, []);
	const prepareAssetsMemoized = React.useCallback(prepareAssets, [assets]);

	React.useEffect(wireUpFontAgentCoordinator, []);

	return (
		<AssetCacheProvider
			assets={assets}
			onAssetCacheLoad={prepareAssetsMemoized}
			onAssetCacheLoadError={discardAssetsMemoized}
		>
			<div className="taletape" />
		</AssetCacheProvider>
	);

	function discardAssets(): void {
		setAssetStatus('unavailable');
	}

	function mountFonts(
		assets: AssetRecord,
		assetCache: AssetCache
	): Promise<void> {
		const fontAgentCoordinator = fontAgentCoordinatorRef.current;

		if (fontAgentCoordinator == null) {
			return Promise.reject(
				new Error('The referenced FontAgentCoordinator has not been created.')
			);
		}

		const fontAssetKeys: Array<string> = [];
		Object.entries(assets).forEach(([assetKey, asset]) => {
			if (asset != null && asset.type === 'font') {
				fontAssetKeys.push(assetKey);
			}
		});

		const fontIsMountedPromises: Array<Promise<void>> = [];
		fontAssetKeys.forEach((key) => {
			const fontIsMountedPromise = assetCache
				.getAssetContainer(key)
				.then((assetContainer) => {
					if (assetContainer == null || assetContainer.asset.type !== 'font') {
						return;
					}

					return fontAgentCoordinator.mountFont(
						key,
						assetContainer.asset.fontFamily,
						assetContainer.asset.fontFaceDescriptors,
						assetContainer.blob
					);
				});

			fontIsMountedPromises.push(fontIsMountedPromise);
		});

		return Promise.all(fontIsMountedPromises).then(() => undefined);
	}

	function prepareAssets(assetCache: AssetCache): void {
		if (assets == null) {
			return;
		}

		const fontsAreLoadedPromise = mountFonts(assets, assetCache);

		Promise.all([fontsAreLoadedPromise])
			.then(() => {
				setAssetStatus('ready');

				return;
			})
			.catch(() => {
				setAssetStatus('unavailable');
			});
	}

	function wireUpFontAgentCoordinator(): () => void {
		const fontAgentCoordinator =
			fontAgentCoordinatorRef.current != null
				? fontAgentCoordinatorRef.current
				: new FontAgentCoordinator();

		return () => {
			setAssetStatus('pending');

			void fontAgentCoordinator.unmountAllFonts();
		};
	}
}
