import process from 'node:process';
import { describe, afterEach, it, expect, vi } from 'vitest';
import core from '@actions/core';
import { action } from './action.js';

describe('setEnvVars', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should error when the env does not exist', async () => {
        core.getBooleanInput = vi.fn(() => true);

        core.getInput = vi.fn(() => '.env.test.missing');

        core.error = vi.fn();

        await action();

        expect(core.error).toHaveBeenCalledTimes(1);
    });

    it('should load variables from the provided .env.test file', async () => {
        core.exportVariable = vi.fn();

        core.getBooleanInput = vi.fn(() => false);

        core.getInput = vi.fn(() => '.env.test');

        await action();

        expect(process.env.HELLO).toEqual('world');

        expect(core.exportVariable).toHaveBeenCalled();
    });

    it('should not overwrite env variables by default', async () => {
        core.exportVariable = vi.fn();

        core.getBooleanInput = vi.fn(() => false);

        core.getInput = vi.fn(() => '.env.test');

        await action();

        expect(process.env.HELLO).toEqual('world');

        core.getInput = vi.fn(() => '.env.test2');

        await action();

        expect(process.env.HELLO).toEqual('world');
    });

    it('should overwrite environment variables with a flag', async () => {
        core.exportVariable = vi.fn();

        core.getBooleanInput = vi.fn(() => true);

        core.getInput = vi.fn(() => '.env.test');

        await action();

        expect(process.env.HELLO).toEqual('world');

        core.getInput = vi.fn(() => '.env.test2');

        await action();

        expect(process.env.HELLO).toEqual('hello');
    });
});
