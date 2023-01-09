import * as React from 'react';

import AssetUrlCatalog from '~/src/taletape/types/asset-url-catalog';
import Scenario from '~/src/taletape/types/scenario';

interface PropCollection {
	scenario: Scenario;
	assetUrlCatalog?: AssetUrlCatalog;
}

export default function Taletape({
	assetUrlCatalog,
	scenario
}: PropCollection): React.ReactElement {
	return <div className="taletape" />;
}
