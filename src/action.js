import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import core from '@actions/core';
import dotenv from 'dotenv';

export async function action() {
    core.warning(
        'Deprecation notice: This action is deprecated and may be removed in the future. ' +
        'Please use GitHub configuration variables instead. ' +
        'See: https://docs.github.com/en/actions/learn-github-actions/variables#using-the-vars-context-to-access-configuration-variable-values'
    );

    const envFile = core.getInput('envFile', { required: true });
    const envFilePath = path.join(process.cwd(), `${envFile}`);
    const overwrite = core.getBooleanInput('overwrite');

    if (overwrite) {
        try {
            const envConfig = dotenv.parse(await fs.readFile(envFilePath));

            for (const key of Object.getOwnPropertyNames(envConfig)) {
                process.env[key] = envConfig[key];
            }
        } catch {
            core.error(`${envFile} does not exist`);
        }
    } else {
        dotenv.config({ path: envFilePath });
    }

    try {
        // Get env vars passed into this action and add them to the repo env,
        // so they are available for the next steps
        for (const [key, value] of Object.entries(process.env)) {
            core.exportVariable(`${key}`, `${value}`);
        }
    } catch (error) {
        core.error(`Error ${error}`);
    }
}
