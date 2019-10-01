import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import LaboratorioService from "./../services/LaboratorioService.js";

export default class LaboratorioUpdateView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new LaboratorioService();
    }

    connectedCallback() {
        this.service.find(this.params.id)
        .then(json => {
            this.data = json;
            this.changeView();
            this.dataToUi(this.data);
        })
    }

    onsave(e) {
        e.preventDefault();
        this.uiToData(this.data);
        this.service.update(this.data)
            .then(msg => console.log(msg));

    }


    createView() {
        return html`
        <form class="pure-form pure-form-stacked" @submit=${e => this.onsave(e)}>
            <div class="pure-g">
                <div class="pure-u-1">
                    <label for="denominazione">Denominazione</label>
                    <input id="denominazione" data-bind="denominazione" class="pure-u-23-24" type="text" required />
                </div>
            </div>
            <input type="submit" value="Salva" class="pure-button pure-button-primary"/>
        </form>
        `;
    }

    createStyle() {
        return html``;
    }

    


}
customElements.define('laboratorio-update', LaboratorioUpdateView);