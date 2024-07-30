/* eslint @typescript-eslint/no-var-requires: "off" */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3000', // Replace with your URL
		video: false,
	},
});
