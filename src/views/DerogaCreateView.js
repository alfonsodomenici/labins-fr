import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import DerogaService from "../services/DerogaService.js";

export default class DerogaCreateView extends ApElementView {

    constructor() {
        super({});
        this.service = new DerogaService({ uri: this.params.suburi });
    }

    connectedCallback() {
        this.changeView();
        this.dataToUi();
    }

    onsave(e) {
        e.preventDefault();
        const inputs = this.fields.filter(v => v instanceof HTMLInputElement)
        const entity = {};
        this.uiToData(entity);
        this.service.create(entity)
            .then(msg => console.log(msg));

    }


    createView() {
        return html`
        <form class="pure-form pure-form-stacked" @submit=${e => this.onsave(e)}>
            <div class="pure-g">
                <div class="pure-u-2">
                    <label for="dataDeroga">Data deroga</label>
                    <input id="dataDeroga" data-bind="dataDeroga" class="pure-u-23-24" type="date">
                </div>
                <div class="pure-u-1 pure-u-md-1-2">
                    <label for="fs">Fuori Servizio collegato</label>
                    <select id="fs" data-bind="parent" class="pure-input-1-2" required>
                        ${this.viRequired.map(v => this.renderOptions(v))}
                    </select>
                </div>
                <div class="pure-u-1">
                    <label for="motivazione">Motivazione</label>
                    <textarea id="motivazione" data-bind="motivazione" class="pure-u-23-24"></textarea>
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
customElements.define('deroga-create', DerogaCreateView);