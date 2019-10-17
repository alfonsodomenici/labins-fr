import ApElementView from "./../ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import DerogaService from "./../services/DerogaService.js";
import ApparecchiaturaService from './../services/ApparecchiaturaService.js';
import Apparecchiatura from "../models/Apparecchiatura.js";

export default class DerogaCreateView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new DerogaService({ uri: this.params.suburi });
        this.appService = new ApparecchiaturaService(params);
    }

    connectedCallback() {
        this.appService.find(this.params.id)
            .then(json => {
                console.log(json);
                this.apparecchiatura = new Apparecchiatura(json);
                this.changeView();
            });
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
                <div class="pure-u-1 pure-u-md-1-2">
                    <label for="dataDeroga">Data deroga</label>
                    <input id="dataDeroga" data-bind="dataDeroga" class="pure-u-23-24" type="date" required>
                </div>
                <div class="pure-u-1 pure-u-md-1-2">
                    <label for="fs">Tipo deroga</label>
                    <select id="fs" data-bind="tipo" class="pure-input-1-2" required>
                        ${this.renderTipoOptions()}
                    </select>
                </div>
                <div class="pure-u-1">
                    <label for="motivazione">Motivazione</label>
                    <textarea id="motivazione" data-bind="motivazione" class="pure-u-23-24" required></textarea>
                </div>
            </div>
            <input type="submit" value="Salva" class="pure-button pure-button-primary"/>
        </form>
        `;
    }

    createStyle() {
        return html``;
    }

    renderTipoOptions() {
        if(this.apparecchiatura.isManutenzioneTemporale() && this.apparecchiatura.isTaraturaTemporale() ){
            return html` 
                <option value='taratura'>taratura</option>
                <option value='manutenzione'>manutenzione</option>
            `;
        }else if (this.apparecchiatura.isTaraturaTemporale() && !this.apparecchiatura.isManutenzioneTemporale()){
            return html` 
                <option value='taratura'>taratura</option>
            `;
        }else{
            return html`
                <option value='manutenzione'>manutenzione</option>
            `;
        }
    }

}
customElements.define('deroga-create', DerogaCreateView);