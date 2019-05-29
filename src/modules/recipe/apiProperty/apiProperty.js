import { LightningElement, track } from 'lwc';

export default class ApiProperty extends LightningElement {
    @track percentage = 50;

    handlePercentageChange(event) {
        const percentage = event.target.value;
        this.percentage = percentage <= 100 ? percentage : 100;
    }
}
