// You only need this file
// - if you don't want to customize your Jest environment
// - if you don't want to use Jest i. e. from a Visual Studio Code extension
const { jestConfig } = require('lwc-services/lib/config/jestConfig');

const setupFilesAfterEnv = jestConfig.setupFilesAfterEnv || [];
setupFilesAfterEnv.push('<rootDir>/jest-sa11y-setup.js');

module.exports = {
    ...jestConfig,
    // Stubs for 3rd party components and wire adapters
    moduleNameMapper: {
        '^ui/(.+)$': '<rootDir>/jest-mocks/ui/$1/$1',
        'data/wireGetContactListProvider':
            '<rootDir>/jest-mocks/data/wireGetContactListProvider/wireGetContactListProvider'
    },
    // Adding canvas mock for Chart.js tests
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv
};
