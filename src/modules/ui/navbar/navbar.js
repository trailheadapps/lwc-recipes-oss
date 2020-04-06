import { LightningElement, api } from 'lwc';

export default class NavBar extends LightningElement {
    @api
    set navItems(value) {
        this._navItemsPrivate = [];
        Object.keys(value).forEach((key) => {
            this._navItemsPrivate.push(value[key]);
            if (value[key].visible) {
                this.currentNavItem = value[key].value;
            }
        });
    }
    get navItems() {
        return this._navItemsPrivate;
    }

    @api
    set selectedItem(value) {
        if (value && this.currentNavItem !== value) {
            this.styleNavItem(this.currentNavItem, value);
            this.currentNavItem = value;
        }
    }
    get selectedItem() {
        return this.currentNavItem;
    }

    currentNavItem;
    _isRendered = false;
    _navItemsPrivate = [];

    renderedCallback() {
        if (this._isRendered) return;
        this._isRendered = true;
        this.template
            .querySelector(`a[data-item="${this.currentNavItem}"]`)
            .parentNode.parentNode.classList.add('active');
    }

    handleNavItemClick(event) {
        const choice = event.currentTarget.dataset.item;
        this.styleNavItem(this.currentNavItem, choice);
        this.currentNavItem = choice;
        event.preventDefault();
        this.dispatchEvent(
            new CustomEvent('categorychange', {
                detail: choice,
                bubbles: true
            })
        );
    }

    styleNavItem(itemOld, itemNew) {
        const tabOld = this.template.querySelector(`a[data-item="${itemOld}"]`)
            .parentNode.parentNode;
        const tabNew = this.template.querySelector(`a[data-item="${itemNew}"]`)
            .parentNode.parentNode;
        tabOld.classList.remove('active');
        tabNew.classList.add('active');
    }
}
