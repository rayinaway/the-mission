module.exports = {
	testMatch: ['<rootDir>/src/**/*.test.js'],
	moduleNameMapper: {
		'^~/(.*)$': '<rootDir>/src/$1'
	},
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/src/test-setup.js'],
	restoreMocks: true,
	coverageDirectory: '<rootDir>/test-coverage'
};
