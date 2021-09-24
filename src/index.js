const fs = require('fs');
const path = require('path');

const core = require('@actions/core');
const dotenv = require('dotenv');

const envFile = core.getInput('envFile', { required: true });

if (!fs.existsSync(`${envFile}`)) {
    core.error(`${envFile} does not exist`);
}

const envFilePath = path.join(process.cwd(), `${envFile}`);
const overwrite = core.getBooleanInput('overwrite');

if (overwrite) {
    const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

    for (const key of envConfig) {
        process.env[key] = envConfig[key];
    }
} else {
    dotenv.config({ path: envFilePath });
}

try {
    // get env vars passed into this actions and add them to the repo env
    // so its available for the next steps
    Object.entries(process.env).forEach(([key, value]) => {
        return core.exportVariable(`${key}`, `${value}`);
    });
} catch (error) {
    core.error(`Error ${error}`);
}
