import { LightningElement, api } from 'lwc';
import { reduceErrors } from 'recipe/ldsUtils';
import noDataIllustration from './templates/noDataIllustration.html';
import inlineMessage from './templates/inlineMessage.html';

export default class ErrorPanel extends LightningElement {
    /** Single or array of errors */
    @api errors;
    /** Generic / user-friendly message */
    @api friendlyMessage = 'Error retrieving data';
    /** Type of error message **/
    @api type;

    viewDetails = false;

    get errorMessages() {
        return reduceErrors(this.errors);
    }

    handleShowDetailsClick() {
        this.viewDetails = !this.viewDetails;
    }

    render() {
        if (this.type === 'inlineMessage') return inlineMessage;
        return noDataIllustration;
    }
}
