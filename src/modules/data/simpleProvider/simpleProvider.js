import { contacts } from 'data/contacts';

export function findContacts(searchKey) {
    if (searchKey.length === 0) return;
    const results = contacts.filter(
        item => item.Name.toLowerCase().indexOf(searchKey) !== -1
    );
    // eslint-disable-next-line consistent-return
    return results;
}

export function getContactList() {
    return { data: contacts };
}
