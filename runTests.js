// runTests.js
import Mocha from 'mocha';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const RPReporter = require('@reportportal/agent-js-mocha');

const mocha = new Mocha({
    reporter: RPReporter,
    reporterOptions: {
        endpoint: process.env.RP_ENDPOINT || 'http://192.168.0.108:8081/api/v1',
        apiKey: process.env.RP_API_KEY,
        project: process.env.RP_PROJECT || 'superadmin_personal',
        launch: process.env.RP_LAUNCH || 'Playwright Test Run',
        description: process.env.RP_DESCRIPTION || 'Playwright tests',
        mode: process.env.RP_MODE || 'DEFAULT',
        debug: process.env.RP_DEBUG === 'true',
        attributes: [
            {
                key: 'platform',
                value: process.env.RP_PLATFORM || 'jenkins',
            },
        ],
    },
});

mocha.suite.emit('pre-require', global, 'runTests.js', mocha);

await import('./test/loginTest.js');

mocha.run((failures) => {
    process.exitCode = failures ? 1 : 0; // exit with non-zero status if there were failures
});
