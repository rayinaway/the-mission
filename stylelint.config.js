module.exports = {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
	plugins: [
		'stylelint-config-rational-order/plugin',
		'stylelint-order',
		'stylelint-prettier'
	],
	rules: {
		'declaration-empty-line-before': null,
		'font-family-name-quotes': 'always-unless-keyword',
		'font-family-no-missing-generic-family-keyword': null,
		'no-descending-specificity': null,
		'order/properties-order': [
			[],
			{
				unspecified: 'top'
			}
		],
		'plugin/rational-order': true,
		'prettier/prettier': true,
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['composes']
			}
		],
		'scss/dollar-variable-empty-line-before': null,
		'scss/operator-no-newline-after': null,
		'scss/operator-no-unspaced': null,
		'selector-class-pattern': '^[a-z][a-zA-Z0-9]+$',
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global']
			}
		],
		'value-keyword-case': [
			'lower',
			{
				ignoreProperties: ['composes']
			}
		]
	}
};
