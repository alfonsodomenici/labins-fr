import { html, render } from "./lib/lit-html.js"
import ApElementView from './ApElementView.js'

export default class ApAppBar extends ApElementView {

    constructor() {
        super();
        this.activeLink = null;
        this._appBar = {};
    }


    connectedCallback() {
        
    }

    onLinkClicked(e) {
        const target = e.composedPath()[0];
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

    set appBar(value) {
        this._appBar = value;
        this.changeView();
    }

    get appBar() {
        return this._appBar;
    }

    createMenuItem({ type, url, label, icon, params, external }) {
        return html`
            <li class="pure-menu-item"><a href="${url}" class="pure-menu-link" @click=${e => this.onLinkClicked(e)}>${label}</a></li>
        `;
    }

    createView() {
        return html`
            <div class="pure-menu pure-menu-horizontal">
                <a href="#" class="pure-menu-heading pure-menu-link">${this.appBar.title}</a>
                <ul class="pure-menu-list">
                    ${this._appBar.menu.map(e => this.createMenuItem(e))}
                </ul>
            </div>
        `;
    }

    createStyle() {
        return html`
        
        `;
    }
}
customElements.define('ap-appbar', ApAppBar);
