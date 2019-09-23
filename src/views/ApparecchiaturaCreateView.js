import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import ApparecchiaturaService from "./../services/ApparecchiaturaService.js";

export default class ApparecchiaturaCreateView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new ApparecchiaturaService(params);
    }

    connectedCallback() {
        this.changeView();
        this.databind();
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
        console.log(JSON.stringify(entity));
        this.service.save(entity)
            .then(json => console.log(json));
    }

    readInputValue(input) {
        if (!input) {
            return null;
        }
        if (input.type === 'text') {
            return input.value;
        } else if (input.type === 'number') {
            return input.value ? input.value : null;
        } else if (input.type === 'date') {
            return input.value ? input.value : null;
        }
    }

    readSelectValue(select) {
        if (!select) {
            return null;
        }
        console.log(typeof select.value);
        return select.value ? { id: Number(select.value) } : null;
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
                            <label for="dominio">Dominio</label>
                            <select id="dominio" class="pure-input-1-2">
                                <option value="-1"></option>
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
                                <option>AL</option>
                                <option>CA</option>
                                <option>IL</option>
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
                                <option>AL</option>
                                <option>CA</option>
                                <option>IL</option>
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
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="distributore">Distributore</label>
                            <select id="distributore" class="pure-input-1-2">
                                <option value="-1"></option>
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

    databind() {
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