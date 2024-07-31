const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cypress = require('cypress');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/check', async (req, res) => {
    const url = req.body.url;
    try {
        const results = await runCypressTest(url);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

async function runCypressTest(url) {
    var toReturn = {
        status: 200,
        statusError: "",
        violations: [],
        totalRan: results.totalTests,
        totalPassed: results.totalPassed,
        totalFailed: results.totalFailed
    };

    try {
        const results = await cypress.run({
            config: {
                env: {
                    URL_TO_TEST: url,
                },
            },
            spec: './cypress/e2e/accessibility.spec.cy.js',
        });

        if (results.totalFailed > 0) {
            var errorsString = results.runs[0].tests[0].displayError;
            var index = errorsString.lastIndexOf(']');
            var cleaningString = errorsString.substring(0, index - 1);
            var finalString = cleaningString.replace('Error:', '');
            finalString += "]";


            toReturn.violations = JSON.parse(finalString);

            for (i = 0; i < toReturn.violations.length; i++) {
                toReturn.violations[i].impactNumber = toReturn.violations[i].impact == 'critical' ? 0 : toReturn.violations[i].impact == 'serious' ? 1 : toReturn.violations[i].impact == 'moderate' ? 2 : 3;
            }

            return toReturn;
        }
    } catch (err) {
        toReturn.status = 500;
        toReturn.statusError = err.message;
        return toReturn;
    }

    return toReturn;
}
