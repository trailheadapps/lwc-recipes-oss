import { reduceErrors } from 'recipe/ldsUtils';

const UI_API_ERROR = {
    body: [{ message: 'ui-error1' }, { message: 'ui-error2' }]
};
const UI_API_ERROR_REDUCED = ['ui-error1', 'ui-error2'];

const DML_API_ERROR = {
    body: {
        message: 'dml-error1'
    }
};
const DML_API_ERROR_REDUCED = ['dml-error1'];

const JS_ERROR = {
    message: 'js-error1'
};
const JS_ERROR_REDUCED = ['js-error1'];

const HTTP_STATUS_ERROR = {
    statusText: 'http-error1'
};
const HTTP_STATUS_ERROR_REDUCED = ['http-error1'];

describe('lds-utils', () => {
    it('reduces UI API errors', () => {
        const reducedError = reduceErrors(UI_API_ERROR);

        expect(reducedError).toStrictEqual(UI_API_ERROR_REDUCED);
    });

    it('reduces DML API errors', () => {
        const reducedError = reduceErrors(DML_API_ERROR);

        expect(reducedError).toStrictEqual(DML_API_ERROR_REDUCED);
    });

    it('reduces JS errors', () => {
        const reducedError = reduceErrors(JS_ERROR);

        expect(reducedError).toStrictEqual(JS_ERROR_REDUCED);
    });

    it('reduces HTTP status errors', () => {
        const reducedError = reduceErrors(HTTP_STATUS_ERROR);

        expect(reducedError).toStrictEqual(HTTP_STATUS_ERROR_REDUCED);
    });

    it('reduces all types of errors', () => {
        const allErrorTypes = [
            UI_API_ERROR,
            DML_API_ERROR,
            JS_ERROR,
            HTTP_STATUS_ERROR,
            null,
            { property: 'not a valid error' }
        ];
        let expected = [
            UI_API_ERROR_REDUCED,
            DML_API_ERROR_REDUCED,
            JS_ERROR_REDUCED,
            HTTP_STATUS_ERROR_REDUCED
        ];
        expected = expected.reduce((acc, val) => acc.concat(val), []);

        const reducedError = reduceErrors(allErrorTypes);

        expect(reducedError).toStrictEqual(expected);
    });
});
