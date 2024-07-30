const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cypress = require('cypress');
const app = express();
const port = 3000;

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
    console.log(`Server running at http://localhost:${port}`);
});

async function runCypressTest(url) {
    const results = await cypress.run({
        config: {
            env: {
                URL_TO_TEST: url,
            },
        },
        spec: './cypress/e2e/accessibility.spec.cy.js',
    });

    var toReturn = {
        violations : [],
        totalRan : results.totalTests,
        totalPassed : results.totalPassed,
        totalFailed : results.totalFailed
    };

    if (results.totalFailed > 0) {
        var errorsString = results.runs[0].tests[0].displayError;
        var index = errorsString.lastIndexOf(']');
        var cleaningString = errorsString.substring(0, index - 1);
        var finalString = cleaningString.replace('Error:','');
        finalString += "]";


        toReturn.violations = JSON.parse(finalString);
        
        for (i=1; i<= toReturn.violations.length; i++){
            toReturn.violations[i-1].number = i;
        }

        return toReturn;
    }

    return toReturn;
}
