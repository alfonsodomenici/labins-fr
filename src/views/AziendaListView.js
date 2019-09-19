import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class AziendaListView extends ApElementView {

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

    createStyle() {
        return html``;
    }
}
customElements.define('azienda-list', AziendaListView);