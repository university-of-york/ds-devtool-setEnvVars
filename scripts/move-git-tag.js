const execa = require('execa');
const pkg = require('../package.json');

const moveGitTag = async () => {
    const version = pkg.version.slice(0, pkg.version.indexOf('.'));

    if (!version) {
        throw new Error(`Could not find major version from ${version}.`);
    }
    
    const tagName = `v${version}`;

    console.warn(`Updating ${tagName} tag to latest commit...`);
    
    await execa('git', ['push', '--delete', tagName]);
    await execa('git', ['tag', '-f', tagName]);
    await execa('git', ['push', 'main', '--tags']);

    console.warn(`Done.`);
};

module.exports = moveGitTag;
