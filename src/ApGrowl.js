import ApElement from "./ApElement.js";
import { html, render } from "./lib/lit-html.js"

export default class ApGrowl extends ApElement {
    constructor() {
        super();
        this.counter = 0;
        this.messages = new Map();
        this.displayTime = 2000;
    }

    connectedCallback() {
        document.addEventListener('ap-message', e => this.onMessage(e));
        this.changeView();
    }

    onMessage({ detail }) {
        const id = Symbol();
        this.messages.set(id, detail);
        this.changeView();
        this.sleep(this.displayTime)
            .then(() => {
                this.messages.delete(id);
                this.changeView();
            })
    }

    createView() {
        return html`
            <div id="growl" class="growl-container">
                ${Array.from(this.messages.values()).map(v => this.createMessageView(v))}
            </div>
        `;
    }

    createMessageView({ message, error }) {
        return html`
            <div class='growl'>
                <h3>${message}</h3>
            </div>
        `;
    }

    createStyle() {
        return html`
            .growl-container{
                z-index: 10000;
                display: flex;
                position: fixed;
                right: 0;
                top: 5px;
                flex-flow: column;
                justify-content: center;
                align-items: center;
            }
            .growl-container  .growl {
                display: block;
                opacity: 1;
                width: 400px;
                height: 72px;
                margin-top: 20px;
                padding: 10px;
                transition: all .8s ease-in-out;
                background: #f2f2f2;
                box-shadow: rgba(0, 0, 0, .2) 0 0 2px inset, rgba(0, 0, 0, .2) 0 0 10px;
                border-radius: 10px;
                border: none;
            }
        `;
    }
}
customElements.define('ap-growl', ApGrowl);