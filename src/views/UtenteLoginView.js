import ApElement from "./ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import SharedStyle from "../sharedStyle.js";

export default class UtenteLoginView extends ApElement{

    constructor() {
        super();
    }

    connectedCallback() {
        this.changeView();
    }

    createView() {
        return html`
        <form class="pure-form">
            <input type="text" placeholder="ciao">
        </form>
        `;
    }

    createStyle(){
        return html`@import url("./../pure.css")`;
    }
}
customElements.define('utente-login', UtenteLoginView);