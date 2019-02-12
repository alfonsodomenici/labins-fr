import ApElement from "./ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class ApparecchiaturaCreateView extends ApElement {

    constructor() {
        super();
    }
    
    connectedCallback() {
        this.changeView();
    }

    createView() {
        return html`
            <input placeholder='data...'/>
            <button >save</button>
        `;
    }

}
customElements.define('apparecchiatura-create', ApparecchiaturaCreateView);