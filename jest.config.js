module.exports = {
	testMatch: ['<rootDir>/src/**/*.test.js'],
	moduleNameMapper: {
		'^.+\\.scss$': 'identity-obj-proxy',
		'^~/(.*)$': '<rootDir>/src/$1'
	},
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
	restoreMocks: true,
	coverageDirectory: '<rootDir>/test-coverage'
};
