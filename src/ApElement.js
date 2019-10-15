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
                @import url(./pure.css);
                @import url(./grids-responsive.css);
                @import url(./style.css);
                :host{
                    /*all: initial;*/
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

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
