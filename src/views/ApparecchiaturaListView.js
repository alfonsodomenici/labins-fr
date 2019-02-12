import ApElement from "./ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class ApparecchiaturaListView extends ApElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.changeView();
    }

    createView() {
        return html`
            <p>Elenco apparecchiature</p>
        `;
    }
}
customElements.define('apperecchiatura-list', ApparecchiaturaListView);