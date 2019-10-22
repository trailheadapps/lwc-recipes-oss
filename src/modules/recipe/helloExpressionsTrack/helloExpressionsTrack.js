import { LightningElement , track } from 'lwc';

export default class HelloExpressionsTrack extends LightningElement {
    @track fullName = {firstName : '', lastName : ''};

    handleChange(event) {
        const field = event.target.name;
        if (field === 'firstName') {
            this.fullName.firstName = event.target.value;
        } else if (field === 'lastName') {
            this.fullName.lastName = event.target.value;
        } 
    }

    get uppercasedFullName() {
        return `${this.fullName.firstName} ${this.fullName.lastName}`.trim().toUpperCase();
    }
}
