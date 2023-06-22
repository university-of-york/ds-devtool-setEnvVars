module.exports = {
    prettier: true,
    overrides: [
        {
            files: '**/*.test.js',
            env: 'jest',
        },
    ],
    rules: {
        'n/prefer-global/process': 'off',
        'unicorn/prefer-module': 'off',
        'import/extensions': 'off',
        'unicorn/prefer-node-protocol': 'off',
    },
    space: true,
};
