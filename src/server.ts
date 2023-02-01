import * as ReactDomServer from 'react-dom/server';

import {rootRender} from './main';

export function renderStringifiedApp(): string {
	return ReactDomServer.renderToString(rootRender);
}
