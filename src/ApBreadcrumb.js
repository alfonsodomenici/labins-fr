import { html, render } from './../node_modules/lit-html/lit-html.js';
import ApElement from './ApElement.js';

export default class ApBreadcrumb extends ApElement {

    constructor() {
        super();
        this.bc = new Map();
    }

    connectedCallback() {
        document.addEventListener('ap-navigation', e => this.onNavigation(e));
        this.changeView();
    }

    createView() {
        return html`
            <ul class='breadcrumb'>
                ${Array.from(this.bc.values()).map(value => this.createLink(value))}
            </ul>
        `;
    }

    createLink(value) {
        return html`
            <li><a href="#" @click=${e => this.onLinkClicked(e, value)}>${value.link}</a></li> > 
        `;
    }

    createStyle() {
        return html`
            ul.breadcrumb {
                margin-top: 0;
                margin-bottom: 1em;
                margin-left: 0;
                margin-right: 0;
                font-size: .8em;
                padding: 10px 16px;
                list-style: none;
                background-color: #eee;
            }
            ul.breadcrumb li {
                display: inline;
                font-size: 18px;
            }
            ul.breadcrumb li a {
                font-size: .8em;
                color: #0275d8;
                text-decoration: none;
            }
            ul.breadcrumb li a:hover {
                color: #01447e;
                text-decoration: underline;
            }
        `;
    }

    onLinkClicked(e, value) {
        e.preventDefault();
        value.src = 'breadcrumb'
        const event = new CustomEvent(
            'ap-navigation', {
            detail: value,
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);

    }

    onNavigation(e) {
        if (e.detail.src === 'breadcrumb') {
            this.onBreadcrumbNavigation(e);
        } else if (e.detail.src === 'mainnav') {
            this.onMainnavNavigation(e);
        } else {
            this.bc.set(e.detail.link, e.detail);
        }
        this.changeView();
    }

    onBreadcrumbNavigation(e) {
        const keys = Array.from(this.bc.keys());
        const navKeyIdx = keys.findIndex(k => k === e.detail.link);
        keys.splice(0,navKeyIdx + 1);
        keys.forEach(k => this.bc.delete(k));
    }

    onMainnavNavigation(e) {
        this.bc.clear();
        this.bc.set(e.detail.link, e.detail);
    }
}
customElements.define('ap-breadcrumb', ApBreadcrumb);