'use strict';

import { defineConfig } from 'eslint/config';
import eslintJs from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';
import salesforceLwcConfig from '@salesforce/eslint-config-lwc/recommended.js';
import globals from 'globals';

export default defineConfig([
    // Ignore dist and __lwr_cache__
    {
        ignores: ['dist/', '__lwr_cache__/']
    },
    // LWC configuration for client files and Jest mocsk
    {
        files: ['src/modules/**/*.js', 'jest-mocks/**/*.js'],
        extends: [salesforceLwcConfig],
        rules: {
            '@lwc/lwc/no-unknown-wire-adapters': 'off'
        }
    },
    // Jest test files configuration
    {
        files: ['**/__tests__/**/*.js', '**/*.test.js'],
        plugins: {
            jest: jestPlugin
        },
        languageOptions: {
            globals: {
                ...globals.jest,
                ...globals.node
            }
        },
        rules: {
            ...jestPlugin.configs.recommended.rules
        }
    }
]);
