import { LightningElement, api } from 'lwc';
import { reduceErrors } from 'recipe/ldsUtils';

export default class ErrorPanel extends LightningElement {
    /** Single or array of errors */
    @api errors;
    /** Generic / user-friendly message */
    @api friendlyMessage = 'Error retrieving data';

    viewDetails = false;

    get errorMessages() {
        return reduceErrors(this.errors);
    }

    handleCheckboxChange(event) {
        this.viewDetails = event.target.checked;
    }
}
