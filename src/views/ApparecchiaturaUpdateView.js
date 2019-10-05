import ApElementView from "./ApElementView.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js";
import ApparecchiaturaService from "./../services/ApparecchiaturaService.js";
import DominioService from "./../services/DominioService.js";
import AziendaService from "./../services/AziendaService.js";
import TipoApperecchiaturaService from "./../services/TipoApparecchiaturaService.js";
import LaboratorioService from "./../services/LaboratorioService.js";
import GrandezzaService from "../services/GrandezzaService.js";
import UnitaMisuraService from "../services/UnitaMisuraService.js";

export default class ApparecchiaturaUpdateView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new ApparecchiaturaService(params);
        this.labService = new LaboratorioService(params);
        this.domService = new DominioService(params);
        this.azService = new AziendaService();
        this.tappService = new TipoApperecchiaturaService(params);
        this.grandezzaService = new GrandezzaService();
        this.umService = new UnitaMisuraService();
    }


    connectedCallback() {
        Promise.all([
            this.labService.all(),
            this.domService.all(),
            this.tappService.all(),
            this.azService.all(),
            this.grandezzaService.all(),
            this.umService.all(),
            this.service.find(this.params.id)
        ]).then(values => {
            this.laboratori = values[0].laboratori;
            this.domini = values[1];
            this.tipi = values[2];
            this.aziende = values[3].aziende;
            this.grandezze = values[4];
            this.um = values[5];
            this.data = values[6];
            this.taratura = this.data.taratura;
            this.manutenzione = this.data.manutenzione;
            this.changeView();
            this.dataToUi(this.data);
        }
        );
    }

    onsave(e) {
        e.preventDefault();
        this.uiToData(this.data);
        this.service.update(this.data)
            .then(json => {
                this.data = json;
                this.changeView();
                this.dataToUi(this.data);
            });
    }

    onSoggettoTaratura(e) {
        this.taratura = e.path[0].checked;
        this.changeView();
    }

    onSoggettoManutenzione(e) {
        this.manutenzione = e.path[0].checked;
        this.changeView();
    }

    createView() {
        return html`
        <form class="pure-form pure-form-stacked" @submit=${e => this.onsave(e)}>
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
                                <select id="lab" data-bind="laboratorio"  class="pure-input-1-2" disabled>
                                    ${this.laboratori.map(v => this.renderOptions(v, this.params.idLab))}
                                </select>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="dominio">Dominio</label>
                                <select id="dominio" data-bind="dominio"  class="pure-input-1-2">
                                    <option value="-1"></option>
                                    ${this.domini.map(v => this.renderOptions(v))}
                                </select>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="cateneMisura">Catene di misura</label>
                                <select id="cateneMisura" data-bind="cateneMisura" class="pure-input-1-2" multiple>
                                    <option value="-1"></option>
                                </select>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="tipologia">Tipologia</label>
                                <select id="tipologia" data-bind="tipologia" class="pure-input-1-2">
                                    <option value="-1"></option>
                                    ${this.tipi.map(v => this.renderOptions(v))}
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
                                <select id="grandezza" data-bind="grandezza" class="pure-input-1-2">
                                    <option value="-1"></option>
                                    ${this.grandezze.map(v => this.renderOptions(v))}
                                </select>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="campoOperativo">Campo operativo</label>
                                <input id="campoOperativo" data-bind="campoOperativo" class="pure-u-23-24" type="text">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3">
                                <label for="campoMin">Min</label>
                                <input id="campoMin" data-bind="campoMin" class="pure-u-23-24" type="number">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3">
                                <label for="campoMax">Max</label>
                                <input id="campoMax" data-bind="campoMax" class="pure-u-23-24" type="number">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3">
                                <label for="um">Unita di Misura</label>
                                <select id="um" data-bind="um" class="pure-input-1-2">
                                    <option value="-1"></option>
                                    ${this.um.map(v => this.renderOptions(v))}
                                </select>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="incertezza">Incertezza</label>
                                <input id="incertezza" data-bind="incertezza" class="pure-u-23-24" type="text">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="criterioAccettazione">Criterio Accettazione</label>
                                <input id="criterioAccettazione" data-bind="criterioAccettazione" class="pure-u-23-24" type="text">
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="pure-u-1 pure-u-md-1-2">
                    <fieldset>
                        <legend>Info sull'acquisto</legend>
                        <div class="pure-g">
                            <div class="pure-u-1 pure-u-md-1-3">
                                <label for="fabbricatoIl">Data fabbricazione</label>
                                <input id="fabbricatoIl" data-bind="fabbricatoIl" class="pure-u-23-24" type="date">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3">
                                <label for="acquistatoIl">Data acquisto</label>
                                <input id="acquistatoIl" data-bind="acquistatoIl" class="pure-u-23-24" type="date">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-3">
                                <label for="inFunzioneDal">Entrata in funzione</label>
                                <input id="inFunzioneDal" data-bind="inFunzioneDal" class="pure-u-23-24" type="date">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="costruttore">Costruttore</label>
                                <select id="costruttore" data-bind="costruttore" class="pure-input-1-2">
                                    <option value="-1"></option>
                                    ${this.aziende.filter(v => v.costruttore).map(v => this.renderOptions(v))}
                                </select>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="distributore">Distributore</label>
                                <select id="distributore" data-bind="distributore" class="pure-input-1-2">
                                    <option value="-1"></option>
                                    ${this.aziende.filter(v => v.distributore).map(v => this.renderOptions(v))}
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
                                <input id="taratura" data-bind="taratura" @click=${e => this.onSoggettoTaratura(e)} type="checkbox"> Soggetto a taratura
                            </label>
                            <label for="manutenzione" class="pure-checkbox">
                                <input id="manutenzione" data-bind="manutenzione" @click=${e => this.onSoggettoManutenzione(e)} type="checkbox"> Soggetto a manutenzione
                            </label>
                            <label for="riferimento" class="pure-checkbox">
                                <input id="riferimento" data-bind="riferimento" type="checkbox"> Apparecchiatura di riferimento
                            </label>
                        </div>
                    </fieldset>
                </div>
                
                ${this.taratura ? this.createTaraturaView() : html``}
                
                ${this.manutenzione ? this.createManutenzioneView() : html``}
                
            </div>
            <input type="submit"  class="pure-button pure-button-primary" value="Salva" />
        </form>
        `;
    }

    createStyle() {
        return html``;
    }

    createTaraturaView() {
        return html`
            <div class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                    <legend>Soggetto a Taratura</legend>
                    <div class="pure-g">
                        <div class="pure-u-1">
                            <label for="tipo">Tipo</label>
                            <select id="tipo" data-bind="gestioneTaratura.tipo" class="pure-input-1-2">
                                <option value="0">Temporale</option>
                                <option value="1">Descrittiva</option>
                                <option value="2">Prima dell'uso</option>
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="dataPianificata">Data pianificata</label>
                            <input id="dataPianificata" data-bind="gestioneTaratura.dataPianificata" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="frequenza">Frequenza in gg</label>
                            <input id="frequenza" data-bind="gestioneTaratura.freq" class="pure-u-23-24" type="number" min="1">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="descrizione">Descrizione</label>
                            <input id="descrizione" data-bind="gestioneTaratura.descrizione" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="attivita">Attivita</label>
                            <input id="attivita" data-bind="gestioneTaratura.attivita" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1">
                            <label for="taratore">Taratore</label>
                            <select id="taratore" data-bind="gestioneTaratura.azienda" class="pure-input-1-2">
                                <option value="-1"></option>
                            </select>
                        </div>
                    </div>
                </fieldset>
            </div>
        `;
    }

    createManutenzioneView() {
        return html`
            <div class="pure-u-1 pure-u-md-1-2">    
                <fieldset>
                    <legend>Soggetto a Manutenzione</legend>
                    <div class="pure-g">
                        <div class="pure-u-1">
                            <label for="tipo">Tipo</label>
                            <select id="tipo" data-bind="gestioneManutenzione.tipo" class="pure-input-1-2">
                                <option value="0">Temporale</option>
                                <option value="1">Descrittiva</option>
                                <option value="2">Prima dell'uso</option>
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="dataPianificata">Data pianificata</label>
                            <input id="dataPianificata" data-bind="gestioneManutenzione.dataPianificata" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="frequenza">Frequenza in gg</label>
                            <input id="frequenza" data-bind="gestioneManutenzione.freq" class="pure-u-23-24" type="number" min="1">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="descrizione">Descrizione</label>
                            <input id="descrizione" data-bind="gestioneManutenzione.descrizione" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="attivita">Attivita</label>
                            <input id="attivita" data-bind="gestioneManutenzione.attivita" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1">
                            <label for="taratore">Manutentore</label>
                            <select id="taratore" data-bind="gestioneManutenzione.azienda" class="pure-input-1-2">
                                <option value="-1"></option>
                            </select>
                        </div>
                    </div>
                </fieldset>
            </div>
        `;
    }
}
customElements.define('apparecchiatura-update', ApparecchiaturaUpdateView);