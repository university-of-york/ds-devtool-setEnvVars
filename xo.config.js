module.exports = {
    extends: ['prettier'],
    overrides: [
        {
            files: '**/*.test.js',
            env: 'jest',
        },
    ],
    rules: {
        'capitalized-comments': 'off',
        camelcase: 'off',
        eqeqeq: ['error', 'smart'],
        indent: 'off',
        'unicorn/filename-case': 'off',
    },
    space: true,
};
