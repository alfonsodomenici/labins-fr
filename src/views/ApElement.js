import { html, render } from "./../lit-html.js";

export default class ApElement extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
    }

    changeView() {
        render(this.loadView(), this.root);
    }

    loadView(){
        return html`
            <style>
                ${this.createStyle()}
            </style>
            ${this.createView()}
        `;
    }

    createStyle(){
        throw new Error("abstract method call");
    }

    createView(){
        throw new Error("abstract method call");
    }
}
