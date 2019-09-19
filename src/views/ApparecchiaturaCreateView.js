import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import ApElementView from "./ApElementView.js";

export default class ApparecchiaturaCreateView extends ApElementView {

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

    createStyle() {
        return html``;
    }
}
customElements.define('apparecchiatura-create', ApparecchiaturaCreateView);