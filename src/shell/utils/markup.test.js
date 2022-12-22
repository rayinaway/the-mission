import {cnx} from './markup';

describe('cnx shell util', () => {
	test('ignores non-string arguments', () => {
		const cnxCallResult = cnx(
			undefined,
			'string1',
			null,
			'string2',
			true,
			'string3',
			1,
			[],
			{}
		);

		expect(cnxCallResult).toBe('string1 string2 string3');
	});

	test('returns a space-separated concatenation of the passed strings', () => {
		const cnxCallResult = cnx('string1', 'string2', 'string3');

		expect(cnxCallResult).toBe('string1 string2 string3');
	});

	test('returns undefined if no strings were passed', () => {
		const cnxCallResult = cnx();

		expect(cnxCallResult).toBe(undefined);
	});
});
