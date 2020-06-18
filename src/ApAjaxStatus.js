import ApElement from './ApElement.js';
import { html } from "./lib/lit-html.js"

export default class ApAjaxStatus extends ApElement {

    constructor() {
        super();
    }

    connectedCallback() {
        document.addEventListener('ap-loading', e => this.onLoading(e));
        this.changeView();
        this.loadingElement = this.root.querySelector('#loading');
    }

    onLoading({ detail }) {
        detail.end === false ? this.loadingElement.style.display = 'flex' : this.loadingElement.style.display = 'none';
    }

    createView() {
        return html`
            <div id="loading" class="css-loader-container">
                <div class="css-loader"></div>
            </div>
        `;
    }

    createStyle() {
        return html`
            .css-loader {
                opacity: 1;
                border: 16px solid #f3f3f3; 
                border-top: 16px solid blue; 
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 2s linear infinite;
            }
            
            .css-loader-container{
                position: fixed;
                z-index: 10000;
                display: none;
                opacity: .5;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 90vh;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
    }

}
customElements.define('ap-ajaxstatus', ApAjaxStatus);