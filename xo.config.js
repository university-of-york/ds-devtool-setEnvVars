const xoConfig = {
    prettier: true,
    overrides: [
        {
            files: '**/*.test.js',
            env: 'jest',
        },
    ],
    space: true,
};

export default xoConfig;
