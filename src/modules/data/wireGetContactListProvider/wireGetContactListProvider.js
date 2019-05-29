import { register, ValueChangedEvent } from '@lwc/wire-service';
import { contacts } from 'data/contacts';

export default function getContactList() {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        resolve();
    });
}

register(getContactList, eventTarget => {
    eventTarget.addEventListener('connect', () => {
        eventTarget.dispatchEvent(new ValueChangedEvent({ data: contacts }));
    });
});
