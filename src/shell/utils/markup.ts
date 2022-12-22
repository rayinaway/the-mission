export function cnx(...classNameSegments: Array<unknown>): string | undefined {
	const className = classNameSegments.reduce<string>(
		(incompleteClassName, segment) => {
			if (typeof segment !== 'string') {
				return incompleteClassName;
			}

			return incompleteClassName.length > 0
				? `${incompleteClassName} ${segment}`
				: segment;
		},
		''
	);

	return className.length > 0 ? className : undefined;
}
