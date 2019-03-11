import ApElement from "./ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class UtenteLogoutView extends ApElement {

    constructor() {
        super();
    }
    
    connectedCallback() {
        this.changeView();
    }

    createView() {
        return html`
        <form class="pure-form pure-form-aligned">
            <input type="text" placeholder='data...'/>
            <button class="pure-button ">save</button>
        </form>
        `;
    }

    createStyle(){
        return html`@import url("./../pure.css")`;
    }

}
customElements.define('utente-logout', UtenteLogoutView);