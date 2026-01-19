// You only need this file
// - if you don't want to customize your Jest environment
// - if you don't want to use Jest i. e. from a Visual Studio Code extension
import { defaults } from 'jest-config';

const setupFilesAfterEnv = defaults.setupFilesAfterEnv || [];
setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js');

export default {
    preset: '@lwc/jest-preset',
    moduleNameMapper: {
        '^recipe/(.+)$': '<rootDir>/src/modules/recipe/$1/$1',
        '^ui/(.+)$': '<rootDir>/jest-mocks/ui/$1/$1',
        'data/wireGetContactListProvider':
            '<rootDir>/jest-mocks/data/wireGetContactListProvider/wireGetContactListProvider',
        'wired-elements': '<rootDir>/jest-mocks/wired-elements/wiredElements'
    },
    globals: {
        'lwc-jest': {
            nativeShadow: true
        }
    },
    // Adding canvas mock for Chart.js tests
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv
};
