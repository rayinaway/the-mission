import * as React from 'react';

import taletapeScenario from '~/src/layout/data/taletape-scenario.json';
import {ServicesProvider} from '~/src/layout/hooks/services';
import {ServiceCollection} from '~/src/services';
import RootBase from '~/src/shell/components/root-base';
import Taletape from '~/src/taletape';
import '~/src/taletape/index.scss';

import * as cn from './root.module.scss';

interface PropCollection {
	services: ServiceCollection;
}

export default React.memo(Root);

function Root({services}: PropCollection): React.ReactElement {
	return (
		<ServicesProvider value={services}>
			<RootBase className={cn.root as string}>
				<Taletape scenario={taletapeScenario} />
			</RootBase>
		</ServicesProvider>
	);
}
