import * as React from 'react';

import {cnx} from '~/src/shell/utils/markup';

import * as cn from './root-base.module.scss';

export default function RootBase({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
	return <div className={cnx(cn.rootBase, className)} {...props} />;
}
