const fs = require('fs');
const path = require('path');

const core = require('@actions/core');

const action = () => {
    const envFile = core.getInput('envFile', { required: true });

    if (!fs.existsSync(`${envFile}`)) {
        core.error(`${envFile} does not exist`);
    }

    const envFilePath = path.join(process.cwd(), `${envFile}`);
    const overwrite = core.getBooleanInput('overwrite');

    if (overwrite) {
        const envConfig = require('dotenv').parse(fs.readFileSync(envFilePath));

        for (const key of Object.getOwnPropertyNames(envConfig)) {
            process.env[key] = envConfig[key];
        }
    } else {
        require('dotenv').config({ path: envFilePath });
    }

    try {
        // get env vars passed into this actions and add them to the repo env
        // so its available for the next steps
        for (const [key, value] of Object.entries(process.env)) {
            core.exportVariable(`${key}`, `${value}`);
        }
    } catch (error) {
        core.error(`Error ${error}`);
    }
};

module.exports = action;
