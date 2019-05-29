import { LightningElement, api, track } from 'lwc';

export default class NavBar extends LightningElement {
    @api
    set navItems(value) {
        this._navItemsPrivate = [];
        Object.keys(value).forEach(key => {
            this._navItemsPrivate.push(value[key]);
            if (value[key].visible) {
                this._currentNavItem = value[key].value;
            }
        });
    }
    get navItems() {
        return this._navItemsPrivate;
    }

    @track _currentNavItem;
    _isRendered = false;
    _navItemsPrivate = [];

    renderedCallback() {
        if (this._isRendered) return;
        this._isRendered = true;
        this.template
            .querySelector(`a[data-item="${this._currentNavItem}"]`)
            .parentNode.parentNode.classList.add('active');
    }

    handleNavItemClick(event) {
        const choice = event.currentTarget.dataset.item;
        const tabOld = this.template.querySelector(
            `a[data-item="${this._currentNavItem}"]`
        ).parentNode.parentNode;
        const tabNew = this.template.querySelector(`a[data-item="${choice}"]`)
            .parentNode.parentNode;
        this._currentNavItem = choice;
        tabOld.classList.remove('active');
        tabNew.classList.add('active');
        event.preventDefault();
        this.dispatchEvent(
            new CustomEvent('categorychange', {
                detail: choice,
                bubbles: true
            })
        );
    }
}
