module.exports = {
	rules: {
		'body-leading-blank': [2, 'always'],
		'footer-leading-blank': [2, 'always'],
		'scope-empty': [2, 'always'],
		'subject-case': [1, 'always', 'lower-case'],
		'subject-empty': [2, 'never'],
		'subject-full-stop': [2, 'never', '.'],
		'type-empty': [2, 'never'],
		'type-enum': [
			2,
			'always',
			[
				'build',
				'ci',
				'docs',
				'feat',
				'fix',
				'misc',
				'perf',
				'refct',
				'resrc',
				'style',
				'test',
				'tweak'
			]
		]
	},
	defaultIgnores: false
};
