import { LightningElement } from 'lwc';

export default class LibsMomentjs extends LightningElement {
    error;
    selectedDateTime = new Date().toISOString();
    weekOfYear;
    dayOfYear;
    calculatedDateTime;

    momentInitialized = false;

    renderedCallback() {
        if (this.momentInitialized) return;
        this.momentInitialized = true;
        this.setMomentValues(this.selectedDateTime);
    }

    async setMomentValues(dateTime) {
        const moment = await import(/* webpackChunkName: "moment" */ 'moment');
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
