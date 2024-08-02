const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000', // Replace with your URL
		video: false,
		screenshotOnRunFailure: false,
		defaultCommandTimeout: 20000
	},
});
