import ApElement from "./ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
export default class List extends ApElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.changeView();
    }

    createView() {
        return html`
            <p>Componente elenco</p>
        `;
    }
}
customElements.define('comp-list', List);