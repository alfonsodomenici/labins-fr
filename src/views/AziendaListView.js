import ApElement from "./ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class AziendaListView extends ApElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.changeView();
    }

    createView() {
        return html`
            <p>Elenco Aziende</p>
        `;
    }
}
customElements.define('azienda-list', AziendaListView);