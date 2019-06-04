import { LightningElement, track } from 'lwc';
import { navigationItems, navigationElements } from './navigation';

export default class App extends LightningElement {
    @track currentNavigationItem = 'hello';
    @track navigationItems = navigationItems;
    @track nextNavigationItem;
    @track previousNavigationItem;

    navigationElements = navigationElements;

    connectedCallback() {
        if (window.location.hash) {
            const location = window.location.hash.substring(
                1,
                window.location.hash.length
            );
            if (this.navigationElements.indexOf(location) > -1) {
                this.currentNavigationItem = location;
            }
        }
        this.navigationItems[this.currentNavigationItem].visible = true;
        this.calculateNavFooterElements();
    }

    handleCategoryChange(event) {
        if (event) {
            this.navigationItems[this.currentNavigationItem].visible = false;
            this.currentNavigationItem = event.detail;
        }
        this.scrollAndLocation();
        this.calculateNavFooterElements();
        this.navigationItems[this.currentNavigationItem].visible = true;
    }

    handleNavigateNext() {
        this.hideCurrentNavigationItemFromNav();
        this.currentNavigationItem = this.navigationItems[
            this.navigationElements[
                this.navigationElements.indexOf(this.currentNavigationItem) + 1
            ]
        ].value;
        this.handleCategoryChange();
    }

    handleNavigatePrevious() {
        this.hideCurrentNavigationItemFromNav();
        this.currentNavigationItem = this.navigationItems[
            this.navigationElements[
                this.navigationElements.indexOf(this.currentNavigationItem) - 1
            ]
        ].value;
        this.handleCategoryChange();
    }

    calculateNavFooterElements() {
        this.nextNavigationItem = this.navigationItems[
            this.navigationElements[
                this.navigationElements.indexOf(this.currentNavigationItem) + 1
            ]
        ];
        this.previousNavigationItem = this.navigationItems[
            this.navigationElements[
                this.navigationElements.indexOf(this.currentNavigationItem) - 1
            ]
        ];
    }

    hideCurrentNavigationItemFromNav() {
        this.navigationItems[
            this.navigationElements[
                this.navigationElements.indexOf(this.currentNavigationItem)
            ]
        ].visible = false;
    }

    scrollAndLocation() {
        window.location.href = '#'.concat(this.currentNavigationItem);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}
