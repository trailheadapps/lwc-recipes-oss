import { LightningElement, track } from 'lwc';

export default class ApiSpread extends LightningElement {
    @track props = {
        firstName: 'Amy',
        lastName: 'Taylor'
    };

    handleFirstNameChange(event) {
        this.props.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.props.lastName = event.target.value;
    }
}
