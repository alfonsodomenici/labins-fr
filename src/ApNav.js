import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import ApElementView from './ApElementView.js'

export default class ApNav extends ApElementView {

    constructor() {
        super();
        this.activeLink = null;
        this._menu = {};
    }


    connectedCallback() {
        let links = document.querySelectorAll('a');
        window.addEventListener('hashchange', e => this.onNavigation(e));
        //links.forEach(link => this.registerListeners(link));
    }

    registerListeners(link) {
        link.addEventListener('click', ev => this.onLinkClicked(ev));
    }

    onLinkClicked(e) {
        const target = e.path[0];
        this.changeActiveLink(target);
    }

    onNavigation(e) {
        const { hash } = window.location;
        const link = this.root.querySelector(`a[href="${hash}"]`);
        this.changeActiveLink(link);
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: hash.substring(1),
                src: 'mainnav',
                params: {}
            },
            bubbles: true
        }
        );
        this.dispatchEvent(event);
    }

    changeActiveLink(target) {
        if (this.activeLink) {
            this.activeLink.parentElement.classList.toggle('pure-menu-selected');
        }
        this.activeLink = target;
        this.activeLink.parentElement.classList.toggle('pure-menu-selected');
    }

    set menu(value) {
        this._menu = value;
        this.changeView();
    }

    get menu() {
        return this._menu;
    }

    createMenuItem({ type, url, label, icon, params, external }) {
        return html`
            <li class="pure-menu-item"><a href="${url}" class="pure-menu-link" @click=${e => this.onLinkClicked(e)}>${label}</a></li>
        `;
    }

    createView() {
        return html`
            <div class="pure-menu">
                <ul class="pure-menu-list">
                    ${this.menu.map(e => this.createMenuItem(e))}
                </ul>
            </div>
        `;
    }

    createStyle() {
        return html`
        
        `;
    }
}
customElements.define('ap-nav', ApNav);
