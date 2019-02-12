import { render } from "./../../node_modules/lit-html/lit-html.js";

export default class ApElement extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
    }

    changeView() {
        render(this.createView(), this.root);
    }
}
