import { LightningElement, track } from 'lwc';

export default class LibsMomentjs extends LightningElement {
    @track error;
    @track selectedDateTime = new Date().toISOString();
    @track weekOfYear;
    @track dayOfYear;
    @track calculatedDateTime;

    momentInitialized = false;

    renderedCallback() {
        if (this.momentInitialized) return;
        this.momentInitialized = true;
        this.setMomentValues(this.selectedDateTime);
    }

    async setMomentValues(dateTime) {
        const moment = await require(/* webpackChunkName: "moment" */ 'moment');
        const mom = moment.utc(dateTime);
        this.selectedDateTime = dateTime;
        this.weekOfYear = mom.week();
        this.dayOfYear = mom.dayOfYear();
        this.calculatedDateTime = mom
            .subtract(3, 'day')
            .add(10, 'hour')
            .subtract(33, 'minute')
            .calendar();
    }

    handleDateTimeChange(event) {
        this.setMomentValues(event.target.value);
    }
}
