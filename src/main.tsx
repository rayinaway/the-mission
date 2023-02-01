import * as React from 'react';
import * as ReactDomClient from 'react-dom/client';

import Root from '~/src/layout/components/root';

import services from './services';

export const rootRender = (
	<React.StrictMode>
		<Root services={services} />
	</React.StrictMode>
);

if (typeof window !== 'undefined') {
	renderApp();
}

function renderApp(): void {
	const appElement = document.querySelector('#app');

	if (appElement != null) {
		if (appElement.childNodes.length > 0) {
			ReactDomClient.hydrateRoot(appElement, rootRender);
		} else {
			ReactDomClient.createRoot(appElement).render(rootRender);
		}
	}
}
