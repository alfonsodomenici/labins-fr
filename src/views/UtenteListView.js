import ApElement from "./ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class UtenteListView extends ApElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.changeView();
    }

    createView() {
        return html`
            <p>Elenco Utenti</p>
        `;
    }
}
customElements.define('utente-list', UtenteListView);