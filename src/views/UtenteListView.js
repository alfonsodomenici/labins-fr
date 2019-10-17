import ApElementView from "./../ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class UtenteListView extends ApElementView {

    constructor(params) {
        super(params);
    }

    connectedCallback() {
        this.changeView();
    }

    createView() {
        return html`
            <p>Elenco Utenti</p>
        `;
    }

    createStyle() {
        return html``;
    }
}
customElements.define('utente-list', UtenteListView);