import { html, render } from "./../../node_modules/lit-html/lit-html.js";

export default class ApElement extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
    }

    changeView() {
        render(this.loadView(), this.root);
    }

    loadView() {
        return html`
            <style>
                @import url(./../pure.css);
                :host{
                    all: initial;
                    display:block;
                }  
                ${ this.createStyle()}
            </style >
            ${ this.createView()}
        `;
    }

    createStyle() {
        throw new Error("abstract method call");
    }

    createView() {
        throw new Error("abstract method call");
    }
}
