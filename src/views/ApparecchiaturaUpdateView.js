import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";
import ApparecchiaturaService from "./../services/ApparecchiaturaService.js";
import DominioService from "./../services/DominioService.js";
import AziendaService from "./../services/AziendaService.js";
import TipoApperecchiaturaService from "./../services/TipoApparecchiaturaService.js";
import LaboratorioService from "./../services/LaboratorioService.js";

export default class ApparecchiaturaUpdateView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new ApparecchiaturaService(params);
        this.labService = new LaboratorioService(params);
        this.domService = new DominioService(params);
        this.azService = new AziendaService();
        this.tappService = new TipoApperecchiaturaService(params);
    }


    connectedCallback() {
        Promise.all([
            this.labService.all(),
            this.domService.all(),
            this.tappService.all(),
            this.azService.all(),
            this.service.find(this.params.id)
        ]).then(values => {
            this.laboratori = values[0].laboratori;
            this.domini = values[1];
            this.tipi = values[2];
            this.aziende = values[3].aziende;
            this.data = values[4];
            this.changeView();
        }
        );
    }


    createView() {
        return html`
        <form class="pure-form pure-form-stacked">
        <div class="pure-g">
            <div class="pure-u-1">
                <div class="pure-g">
                    <div class="pure-u-1 pure-u-md-1-3 group-view">
                        <label>
                            <span class="label">Codice</span>
                            <span class="content">${this.data.codice}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-3 group-view">
                        <label>
                            <span class="label">Descrizione</span>
                            <span class="content">${this.data.descrizione}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-3 group-view">
                        <label>
                            <span class="label">Matricola</span>
                            <span class="content">${this.data.matricola}</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                    <legend>Ubicazione</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="lab">Laboratorio</label>
                            <select id="lab" class="pure-input-1-2">
                                ${this.laboratori.map(v => html`<option value="${v.id}">${v.denominazione}</option value>`)}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="dom">Dominio</label>
                            <select id="dom" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.domini.map(v => html`<option value="${v.id}">${v.denominazione}</option value>`)}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="cat">Catena di misura</label>
                            <select id="cat" class="pure-input-1-2">
                                <option value="-1"></option>

                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="tipo">Tipologia</label>
                            <select id="tipo" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.tipi.map(p => html`<option value="${p.id}">${p.descrizione}</option value>`)}
                            </select>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                    <legend>Campo di misura</legend>

                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="grandezza">Grandezza</label>
                            <select id="grandezza" class="pure-input-1-2">
                                <option>AL</option>
                                <option>CA</option>
                                <option>IL</option>
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="cop">Campo operativo</label>
                            <input id="cop" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="min">Min</label>
                            <input id="min" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="max">Max</label>
                            <input id="max" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="um">Unita di Misura</label>
                            <select id="um" class="pure-input-1-2">
                                <option>AL</option>
                                <option>CA</option>
                                <option>IL</option>
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="incer">Incertezza</label>
                            <input id="incer" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="ca">Criterio Accettazione</label>
                            <input id="ca" class="pure-u-23-24" type="text">
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                    <legend>Info sull'acquisto</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="dFabbricazione">Data fabbricazione</label>
                            <input id="dFabbricazione" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="dAcquisto">Data acquisto</label>
                            <input id="dAcquisto" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="dInFunzione">Entrata in funzione</label>
                            <input id="dInFunzione" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="costruttore">Costruttore</label>
                            <select id="costruttore" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.aziende.filter(e => e.costruttore).map(v => html`<option value="${v.id}">${v.denominazione}</option value>`)}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="distributore">Distributore</label>
                            <select id="distributore" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.aziende.filter(e => e.distributore).map(v => html`<option value="${v.id}">${v.denominazione}</option value>`)}
                            </select>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                    <legend>Flags</legend>
                    <div class="pure-u-1">
                        <label for="taratura" class="pure-checkbox">
                            <input id="taratura" type="checkbox"> Soggetto a taratura
                        </label>
                        <label for="manutenzione" class="pure-checkbox">
                            <input id="manutenzione" type="checkbox"> Soggetto a manutenzione
                        </label>
                        <label for="appr" class="pure-checkbox">
                            <input id="appr" type="checkbox"> Apparecchiatura di riferimento
                        </label>
                    </div>
                </fieldset>

            </div>
        </div>
        <button type="submit" class="pure-button pure-button-primary">Submit</button>
    </form>
        `;
    }

    createStyle() {
        return html``;
    }
}
customElements.define('apparecchiatura-update', ApparecchiaturaUpdateView);