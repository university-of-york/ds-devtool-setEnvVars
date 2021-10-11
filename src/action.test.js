jest.mock('@actions/core');

const core = require('@actions/core');
const action = require('./action');

describe('setEnvVars', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should error when the env does not exist', () => {
        core.getInput = jest.fn(() => '.env.test.missing');

        core.error = jest.fn();

        action();

        expect(core.error).toHaveBeenCalledTimes(1);
    });

    it('should load variables from the provided .env.test file', () => {
        core.exportVariable = jest.fn();

        core.getBooleanInput = jest.fn(() => false);

        core.getInput = jest.fn(() => '.env.test');

        action();

        expect(process.env.HELLO).toEqual('world');

        expect(core.exportVariable).toHaveBeenCalled();
    });

    it('should not overwrite env variables by default', () => {
        core.exportVariable = jest.fn();

        core.getBooleanInput = jest.fn(() => false);

        core.getInput = jest.fn(() => '.env.test');

        action();

        expect(process.env.HELLO).toEqual('world');

        core.getInput = jest.fn(() => '.env.test2');

        action();

        expect(process.env.HELLO).toEqual('world');
    });

    it('should overwrite environment variables with a flag', () => {
        core.exportVariable = jest.fn();

        core.getBooleanInput = jest.fn(() => true);

        core.getInput = jest.fn(() => '.env.test');

        action();

        expect(process.env.HELLO).toEqual('world');

        core.getInput = jest.fn(() => '.env.test2');

        action();

        expect(process.env.HELLO).toEqual('hello');
    });
});
