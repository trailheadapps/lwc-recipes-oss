import { LightningElement, api, track } from 'lwc';
import { formatPhoneNumber } from './phoneUtil';

export default class Output extends LightningElement {
    @api currencyCode;
    @api dateType;
    @api label;
    @api type = 'text';

    @api
    set value(val) {
        this.valuePrivate = val;
        this.calculateDateTime();
    }
    get value() {
        return this.valuePrivate;
    }

    @track dateTimeValue;
    @track valuePrivate;

    moment;
    _value;

    get isDateTime() {
        return this.type === 'datetime';
    }

    get isEmail() {
        return this.type === 'email';
    }

    get isNumber() {
        return this.type === 'number';
    }

    get isPhonenumber() {
        return this.type === 'phone';
    }

    get isText() {
        return this.type === 'text';
    }

    async calculateDateTime() {
        if (this.type === 'datetime') {
            if (!this.moment) {
                this.moment = await require(/* webpackChunkName: "moment" */ 'moment');
            }
            const mom = this.moment(this._val);
            switch (this.dateType) {
                case 'weekOfYear':
                    this.dateTimeValue = mom.week();
                    break;
                case 'dayOfYear':
                    this.dateTimeValue = mom.dayOfYear();
                    break;
                default:
                    this.dateTimeValue = mom.format('MMMM Do YYYY, h:mm:ss A');
            }
        }
    }

    get formattedNumber() {
        if (this.valuePrivate) {
            return `${this.currencyCode} ${parseFloat(
                this.valuePrivate
            ).toFixed(2)}`;
        }
        return ' - ';
    }

    get formattedPhonenumber() {
        return formatPhoneNumber(this.value);
    }

    get hrefPhonenumber() {
        return `tel:${this.value}`;
    }

    get hrefEmail() {
        return `mailto:${this.value}`;
    }
}
