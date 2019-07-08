import ApElement from "./ApElement.js";
import { html } from "./../lit-html.js"

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