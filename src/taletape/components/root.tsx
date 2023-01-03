import * as React from 'react';

import Scenario from '~/src/taletape/types/scenario';

interface PropCollection {
	scenario: Scenario;
}

export default function Taletape({
	scenario
}: PropCollection): React.ReactElement {
	return <div className="taletape" />;
}
