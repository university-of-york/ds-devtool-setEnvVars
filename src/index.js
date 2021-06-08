const fs = require('fs');
const path = require('path');

const core = require('@actions/core');

const envFile = core.getInput('envFile', { required: true });

if (!fs.existsSync(`${envFile}`)) {
    core.error(`${envFile} does not exist`);
}

require('dotenv').config({ path: path.join(process.cwd(), `${envFile}`) });

try {
    // get env vars passed into this actions and add them to the repo env
    // so its available for the next steps
    Object.entries(process.env).forEach(([key, value]) => {
        return core.exportVariable(`${key}`, `${value}`);
    });
} catch (error) {
    core.error(`Error ${error}`);
}
