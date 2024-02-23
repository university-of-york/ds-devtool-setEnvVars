import * as fs from 'node:fs/promises';
import { execa } from 'execa';

export async function moveGitTag() {
    const packageJson = JSON.parse(
        await fs.readFile(new URL('../package.json', import.meta.url))
    );

    const version = semverMajor(packageJson.version)

    if (!version) {
        throw new Error(`Could not find major version from ${version}.`);
    }

    const tagName = `v${version}`;

    console.warn(`Updating ${tagName} tag to latest commit...`);

    await execa('git', ['push', '--delete', 'origin', tagName]);
    await execa('git', ['tag', '-f', tagName]);
    await execa('git', ['push', 'origin', '--tags']);

    console.warn(`Done.`);
}

function semverMajor (version) {
    return version.slice(0, version.indexOf('.'))
}
