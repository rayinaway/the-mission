import * as React from 'react';
import * as ReactDomClient from 'react-dom/client';

import Root from '~/src/layout/components/root';

import services from './services';

const appElement = document.querySelector('#app');

if (appElement != null) {
	const rootRender = (
		<React.StrictMode>
			<Root services={services} />
		</React.StrictMode>
	);

	if (appElement.childNodes.length > 0) {
		ReactDomClient.hydrateRoot(appElement, rootRender);
	} else {
		ReactDomClient.createRoot(appElement).render(rootRender);
	}
}
