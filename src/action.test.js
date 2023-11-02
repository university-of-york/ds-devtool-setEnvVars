import process from 'node:process';
import { jest } from '@jest/globals';
import core from '@actions/core';
import { action } from './action.js';

describe('setEnvVars', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should error when the env does not exist', async () => {
        core.getBooleanInput = jest.fn(() => true);

        core.getInput = jest.fn(() => '.env.test.missing');

        core.error = jest.fn();

        await action();

        expect(core.error).toHaveBeenCalledTimes(1);
    });

    it('should load variables from the provided .env.test file', async () => {
        core.exportVariable = jest.fn();

        core.getBooleanInput = jest.fn(() => false);

        core.getInput = jest.fn(() => '.env.test');

        await action();

        expect(process.env.HELLO).toEqual('world');

        expect(core.exportVariable).toHaveBeenCalled();
    });

    it('should not overwrite env variables by default', async () => {
        core.exportVariable = jest.fn();

        core.getBooleanInput = jest.fn(() => false);

        core.getInput = jest.fn(() => '.env.test');

        await action();

        expect(process.env.HELLO).toEqual('world');

        core.getInput = jest.fn(() => '.env.test2');

        await action();

        expect(process.env.HELLO).toEqual('world');
    });

    it('should overwrite environment variables with a flag', async () => {
        core.exportVariable = jest.fn();

        core.getBooleanInput = jest.fn(() => true);

        core.getInput = jest.fn(() => '.env.test');

        await action();

        expect(process.env.HELLO).toEqual('world');

        core.getInput = jest.fn(() => '.env.test2');

        await action();

        expect(process.env.HELLO).toEqual('hello');
    });
});
