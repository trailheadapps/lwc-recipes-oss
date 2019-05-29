import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    @track navigationItems = {
        hello: {
            title: 'Hello',
            value: 'hello',
            visible: false
        },
        composition: {
            title: 'Composition',
            value: 'composition',
            visible: false
        },
        child: {
            title: 'Child-to-Parent',
            value: 'child',
            visible: false
        },
        parent: {
            title: 'Parent-to-Child',
            value: 'parent',
            visible: false
        },
        // wire: {
        //     title: 'Wire',
        //     value: 'wire',
        //     visible: false
        // },
        misc: {
            title: 'Misc',
            value: 'misc',
            visible: false
        },
        party: {
            title: '3rd Party Libs',
            value: 'party',
            visible: false
        }
    };

    @track currentNavigationItem = 'hello';
    // TODO
    @track nextNavigationItem = this.navigationItems.party;
    @track previousNavigationItem = this.navigationItems.hello;

    connectedCallback() {
        if (window.location.hash) {
            this.currentNavigationItem = window.location.hash.substring(
                1,
                window.location.hash.length
            );
        }
        this.navigationItems[this.currentNavigationItem].visible = true;
    }

    handleCategoryChange(event) {
        this.navigationItems[this.currentNavigationItem].visible = false;
        this.currentNavigationItem = event.detail;
        this.navigationItems[event.detail].visible = true;
        window.location.href = '#'.concat(this.currentNavigationItem);
    }
}
