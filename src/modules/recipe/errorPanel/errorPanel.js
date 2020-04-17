import { LightningElement, api } from 'lwc';
import { reduceErrors } from 'recipe/ldsUtils';

export default class ErrorPanel extends LightningElement {
    /** Generic / user-friendly message */
    @api friendlyMessage = 'Error retrieving data';
    /** Single or array of errors */
    @api errors;

    viewDetails = false;

    get errorMessages() {
        return reduceErrors(this.errors);
    }

    handleCheckboxChange(event) {
        this.viewDetails = event.target.checked;
    }
}
