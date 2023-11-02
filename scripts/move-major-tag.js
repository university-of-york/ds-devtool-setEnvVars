#!/usr/bin/env node

import process from 'node:process';
import { moveGitTag } from './move-git-tag.js';

try {
    await moveGitTag();
} catch (error) {
    console.error(error);
    process.exitCode = 1;
}
