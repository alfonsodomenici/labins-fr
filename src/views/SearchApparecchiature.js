import DateFunction from "../DateFunction.js";
import DominioService from "./../services/DominioService.js";
import AziendaService from "./../services/AziendaService.js";
import TipoApparecchiaturaService from "./../services/TipoApparecchiaturaService.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import ApElement from "../ApElement.js";

export default class SearchApparecchiature extends ApElement {

    constructor() {
        super();
        this.oldSearch = {};
    }

    connectedCallback() {
        const params = JSON.parse(this.getAttribute('params'));
        this.domService = new DominioService(params);
        this.azService = new AziendaService();
        this.tappService = new TipoApparecchiaturaService(params);
        Promise.all([
            this.domService.all(),
            this.tappService.allMinimal(),
            this.azService.all()
        ]).then(values => {
            this.domini = values[0];
            this.tipi = values[1];
            this.aziende = values[2].aziende;
            this.changeView();
        }
        );
    }

    createStyle() {
        return html``;
    }

    createView() {
        return html`
                <form method="POST" @submit=${e => this.onsearch(e)} class='pure-form pure-form-stacked'>

                    <fieldset>
                        <legend>Parametri Ricerca</legend>
            
                        <div class="pure-g">
            
                            <div class="pure-u-1 pure-u-md-4-24">
                                <label>Dominio
                                    <select name="dominio">
                                        <option value='-1'>nessun dominio</option>
                                        ${this.domini.map(p => html`<option value="${p.id}">${p.denominazione}</option value>`)}
                                    </select>
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-4-24">
                                <label>Tipo
                                    <select name="tipo">
                                        <option value='-1'>nessun tipo</option>
                                        ${this.tipi.map(p => html`<option value="${p.id}">${p.denominazione}</option value>`)}
                                    </select>
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-4-24">
                                <label>Costruttore
                                    <select name="costruttore">
                                        <option value='-1'>nessun costruttore</option>
                                        ${this.aziende.filter(e => e.costruttore).map(p => html`<option value="${p.id}">${p.denominazione}</option
                                            value>
                                        `)}
                                    </select>
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-4-24">
                                <label>Distributore
                                    <select name="distributore">
                                        <option value='-1'>nessun distributore</option>
                                        ${this.aziende.filter(e => e.distributore).map(p => html`<option value="${p.id}">${p.denominazione}</option
                                            value>
                                        `)}
                                    </select>
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-4-24">
                                <label>Manutentore
                                    <select name="manutentore">
                                        <option value='-1'>nessun manutentore</option>
                                        ${this.aziende.filter(e => e.manutentore).map(p => html`<option value="${p.id}">${p.denominazione}</option
                                            value>
                                        `)}
                                    </select>
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-4-24">
                                <label>Taratore
                                    <select name="taratore">
                                        <option value='-1'>nessun taratore</option>
                                        ${this.aziende.filter(e => e.taratore).map(p => html`<option value="${p.id}">${p.denominazione}</option
                                            value>
                                        `)}
                                    </select>
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-4-24">
                                <input type="submit" class='pure-button pure-button-primary' value="Cerca" />
                            </div>
                        </div>
                    </fieldset>
                    
                </form>
        `;
    }

    onsearch(e) {
        e.preventDefault();
        const { dominio, tipo, costruttore, distributore, manutentore, taratore } = e.target.elements;
        if (this.isChange(dominio, tipo, costruttore, distributore, manutentore, taratore)) {
            this.dispatchEvent(new CustomEvent('search', {
                bubbles: true,
                composed: true,
                detail: {
                    idDom: dominio.value,
                    idTipo: tipo.value,
                    idAz: costruttore.value,
                    idDistr: distributore.value,
                    idMan: manutentore.value,
                    idTar: taratore.value
                }
            }));
        }
    }

    isChange(dominio, tipo, costruttore, distributore, manutentore, taratore) {
        const search = {
            idDom: dominio.value,
            idTipo: tipo.value,
            idAz: costruttore.value,
            idDistr: distributore.value,
            idMan: manutentore.value,
            idTar: taratore.value
        };
        const change = JSON.stringify(this.oldSearch) !== JSON.stringify(search);
        this.oldSearch = search;
        return change;
    }
}
customElements.define('search-apparecchiature', SearchApparecchiature);