import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import ApparecchiaturaService from "./../services/ApparecchiaturaService.js";
import GrandezzaService from "../services/GrandezzaService.js";
import UnitaMisuraService from "../services/UnitaMisuraService.js";
import DominioService from "./../services/DominioService.js";
import AziendaService from "./../services/AziendaService.js";
import TipoApperecchiaturaService from "./../services/TipoApparecchiaturaService.js";
import LaboratorioService from "./../services/LaboratorioService.js";

export default class ApparecchiaturaCreateView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new ApparecchiaturaService(params);
        this.domService = new DominioService(params);
        this.azService = new AziendaService();
        this.tappService = new TipoApperecchiaturaService(params);
        this.grandezzaService = new GrandezzaService();
        this.umService = new UnitaMisuraService();
        this.labService = new LaboratorioService();
    }

    connectedCallback() {
        Promise.all([
            this.domService.all(),
            this.tappService.all(),
            this.azService.all(),
            this.grandezzaService.all(),
            this.umService.all(),
            this.labService.all()
        ]).then(values => {
            this.domini = values[0];
            this.tipi = values[1];
            this.aziende = values[2].aziende;
            this.grandezze = values[3];
            this.um = values[4];
            this.laboratori = values[5].laboratori;
            this.changeView();
            this.bindUi();
        }
        );
    }

    onsave(e) {
        e.preventDefault();
        const fields = Reflect.ownKeys(this).filter(v => v.includes('Input') || v.includes('Select'))
        console.log(fields);
        const entity = {};
        fields.filter(v => v.includes('Input')).forEach(v => {
            Reflect.set(entity, v.replace('Input', ''), this.readInputValue(Reflect.get(this, v)));
        });
        fields.filter(v => v.includes('Select')).forEach(v => {
            Reflect.set(entity, v.replace('Select', ''), this.readSelectValue(Reflect.get(this, v)));
        });
        this.service.create(entity)
            .then(msg => console.log(msg));
    }

    
    createView() {
        return html`
        <form class="pure-form pure-form-stacked">
        <div class="pure-g">
            <div class="pure-u-1">
                <div class="pure-g">
                    <div class="pure-u-1 pure-u-md-1-3">
                        <label for="codice">Codice</label>
                        <input id="codice" class="pure-u-23-24" type="text">
                    </div>
                    <div class="pure-u-1 pure-u-md-1-3">
                        <label for="descrizione">Descrizione</label>
                        <input id="descrizione" class="pure-u-23-24" type="text">
                    </div>
                    <div class="pure-u-1 pure-u-md-1-3">
                        <label for="matricola">Matricola</label>
                        <input id="matricola" class="pure-u-23-24" type="text">
                    </div>
                </div>
            </div>
            <div class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                    <legend>Ubicazione</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="lab">Laboratorio</label>
                            <select id="lab" class="pure-input-1-2" disabled>
                                ${this.laboratori.map(v => this.renderOptions(v, this.params.idLab))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="dominio">Dominio</label>
                            <select id="dominio" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.domini.map(v => this.renderOptions(v))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="cateneMisura">Catene di misura</label>
                            <select id="cateneMisura" class="pure-input-1-2" multiple>
                                <option value="-1"></option>
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="tipologia">Tipologia</label>
                            <select id="tipologia" class="pure-input-1-2">
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
                            <select id="grandezza" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.grandezze.map(v => this.renderOptions(v))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="campoOperativo">Campo operativo</label>
                            <input id="campoOperativo" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="campoMin">Min</label>
                            <input id="campoMin" class="pure-u-23-24" type="number">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="campoMax">Max</label>
                            <input id="campoMax" class="pure-u-23-24" type="number">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="um">Unita di Misura</label>
                            <select id="um" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.um.map(v => this.renderOptions(v))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="incertezza">Incertezza</label>
                            <input id="incertezza" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="criterioAccettazione">Criterio Accettazione</label>
                            <input id="criterioAccettazione" class="pure-u-23-24" type="text">
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
                            <input id="fabbricatoIl" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="acquistatoIl">Data acquisto</label>
                            <input id="acquistatoIl" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="inFunzioneDal">Entrata in funzione</label>
                            <input id="inFunzioneDal" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="costruttore">Costruttore</label>
                            <select id="costruttore" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.aziende.filter(v => v.costruttore).map(v => this.renderOptions(v))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="distributore">Distributore</label>
                            <select id="distributore" class="pure-input-1-2">
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
        <button type="submit" @click=${e => this.onsave(e)} class="pure-button pure-button-primary">Salva</button>
    </form>
        `;
    }

    createStyle() {
        return html``;
    }

    bindUi() {
        this.codiceInput = this.root.querySelector('#codice');
        this.descrizioneInput = this.root.querySelector('#descrizione');
        this.matricolaInput = this.root.querySelector('#matricola');
        this.dominioSelect = this.root.querySelector('#dominio');
        this.cateneMisuraSelect = this.root.querySelector('#cateneMisura');
        this.tipologiaSelect = this.root.querySelector('#tipologia');
        this.grandezzaSelect = this.root.querySelector('#grandezza');
        this.campoOperativoInput = this.root.querySelector('#campoOperativo');
        this.campoMinInput = this.root.querySelector('#campoMin');
        this.campoMaxInput = this.root.querySelector('#campoMax');
        this.umSelect = this.root.querySelector('#um');
        this.incertezzaInput = this.root.querySelector('#incertezza');
        this.criterioAccettazioneInput = this.root.querySelector('#criterioAccettazione');
        this.fabbricatoIlInput = this.root.querySelector('#fabbricatoIl');
        this.acquistatoIlInput = this.root.querySelector('#acquistatoIl');
        this.inFunzioneDalInput = this.root.querySelector('#inFunzioneDal');
        this.costruttoreSelect = this.root.querySelector('#costruttore');
        this.distributoreSelect = this.root.querySelector('#distributore');
    }


}
customElements.define('apparecchiatura-create', ApparecchiaturaCreateView);