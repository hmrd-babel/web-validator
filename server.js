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
        res.status(500).json({ error: 500, errorMessage: error.message });
    }
});

app.listen(port, () => {
    const path = require('path');
    const filePath = process.env.FILE_PATH || './node_modules/axe-core/axe.min.js';
    
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Getting path: ${filePath}`);
});

async function runCypressTest(url) {
    const results = await cypress.run({
        headless: true,
        config: {
            env: {
                URL_TO_TEST: url,
            },
        },
        spec: './cypress/e2e/accessibility.spec.cy.js',
    });

    var toReturn = {
        error: 200,
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
        
        for (i=0; i< toReturn.violations.length; i++){
            toReturn.violations[i].impactNumber =  toReturn.violations[i].impact == 'critical' ? 0 : toReturn.violations[i].impact == 'serious' ? 1 : toReturn.violations[i].impact == 'moderate' ? 2 : 3 ;
        }

        return toReturn;
    }

    return toReturn;
}