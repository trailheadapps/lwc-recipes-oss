import { LightningElement, track } from 'lwc';
import { navigationItems, navigationElements } from './navigation';

export default class App extends LightningElement {
    @track currentNavigationItem = 'hello';
    @track navigationItems = navigationItems;
    @track nextNavigationItem;
    @track previousNavigationItem;

    navigationElements = navigationElements;
    _isWindowHistoryUpdate = false;

    connectedCallback() {
        let that = this;
        window.onpopstate = function(event) {
            if (event.state && event.state.page) {
                that._isWindowHistoryUpdate = true;
                that.navigationItems[
                    that.currentNavigationItem
                ].visible = false;
                that.currentNavigationItem = event.state.page;
                that.hideCurrentNavigationItemFromNav();
                that.handleCategoryChange();
            }
        };
        if (window.location.hash) {
            const location = window.location.hash.substring(
                1,
                window.location.hash.length
            );
            if (this.navigationElements.indexOf(location) > -1) {
                this.currentNavigationItem = location;
                window.history.replaceState({ page: location }, null, '');
            }
        } else {
            window.history.replaceState(
                { page: this.currentNavigationItem },
                null,
                ''
            );
        }
        this.navigationItems[this.currentNavigationItem].visible = true;
        this.calculateNavFooterElements();
    }

    handleCategoryChange(event) {
        if (event) {
            if (this.currentNavigationItem !== event.detail) {
                this.navigationItems[
                    this.currentNavigationItem
                ].visible = false;
                this.currentNavigationItem = event.detail;
            } else {
                return;
            }
        }
        this.updateGoogleAnalyticsForSPA(this.currentNavigationItem);
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
        if (!this._isWindowHistoryUpdate) {
            window.history.pushState(
                { page: this.currentNavigationItem },
                null,
                '#'.concat(this.currentNavigationItem)
            );
        }
        this._isWindowHistoryUpdate = false;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    updateGoogleAnalyticsForSPA(newPage) {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag('config', 'UA-45076517-19', {
            page_path: '#'.concat(newPage)
        });
    }
}
