import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import ApparecchiaturaService from "./../services/ApparecchiaturaService.js";
import DocumentoCreateView from "./DocumentoCreateView.js";
import AziendaService from "./../services/AziendaService.js";
import FuoriServizioService from "./../services/FuoriServizioService.js";

export default class FuoriServizioCreateView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new FuoriServizioService({ uri: this.params.suburi });
        this.appService = new ApparecchiaturaService(params);
        this.azService = new AziendaService();
        this.uploads = [];
        this.motivo = 0;
    }

    connectedCallback() {
        Promise.all([
            this.azService.all(),
            this.appService.findDiRiferimento(),
            this.appService.find(this.params.id)
        ]).then(values => {
            this.aziende = values[0].aziende;
            this.apparecchiatureRif = values[1];
            this.apparecchiatura = values[2];
            this.changeView();
        }
        );

    }

    onsave(e) {
        e.preventDefault();
        const entity = {};
        this.uiToData(entity);
        console.log(entity);
        this.service.create(entity)
            .then(json => this.service.updloadDocumenti(json.id, this.uploads))
            .then(values => console.log(values));
    }

    onAddDocumento(e) {
        console.log(e.detail);
        this.uploads.push(e.detail);
        this.changeView();
    }

    onDeleteDocumento(e, id) {
        e.preventDefault();
        this.uploads = this.uploads.filter(v => v.id !== id);
        this.changeView();
    }

    createView() {
        if (this.params.view === 'fs') {
            return this.createFsView();
        } else if (this.params.view === 'vi') {
            return this.createViView();
        } else {
            return this.createRisView();
        }
    }

    createFsView() {
        return html`
            <form class="pure-form pure-form-stacked" @submit=${e => this.onsave(e)}>
                <fieldset>
                    <legend>Messa Fuori Servizio</legend>
                    <div class="pure-g">
                        ${this.createApparecchiaturaView()}
                        <div class="pure-u-1">
                            <label for="motivo">Motivo Fuori Servizio</label>
                            <select id="motivo" data-bind="motivo" class="pure-input-1-2" required>
                                <option value="0">Manutenzione</option>
                                <option value="1">Taratura</option>
                                <option value="3">Fori ServizioStraordinario</option>
                            </select>
                        </div>

                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="inizio">Dal</label>
                            <input id="inizio" data-bind="inizio" class="pure-u-23-24" type="date" required>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="utenteInizio">Inviato da</label>
                            <input id="utenteInizio" data-bind="utenteInizio" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="fine">Al</label>
                            <input id="fine" data-bind="fine" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="utenteFine">Inviato da</label>
                            <input id="utenteFine" data-bind="utenteFine" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="azienda">Taratore/Distributore</label>
                            <select id="azienda" data-bind="azienda" class="pure-input-1-2" required>
                                <option value="-1"></option>
                                ${this.aziende.map(v => this.renderOptions(v))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="riferimento">Apparecchio di riferimento</label>
                            <select id="riferimento" data-bind="riferimento" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.apparecchiatureRif.map(v => this.renderOptions(v))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="necessariaVerifica" class="pure-checkbox">
                                <input id="necessariaVerifica" data-bind="necessariaVerifica" type="checkbox"> Necessaria
                                verifica intermedia dopo giorni
                                taratura
                            </label>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="giorniVerifica"></label>
                            <input id="giorniVerifica" data-bind="giorniVerifica" class="pure-u-23-24" min="0" type="number">
                        </div>

                        ${this.createDocumentiView()}

                    </div>
                    <input type="submit" class="pure-button pure-button-primary" value="Salva" />
                </fieldset>
            </form>
        `;
    }

    createRisView() {
        return html`
            <form class="pure-form pure-form-stacked" @submit=${e => this.onsave(e)}>
                <fieldset>
                    <legend>Rimessa in Servizio</legend>
                    <div class="pure-g">
                        ${this.createApparecchiaturaView()}
                        <div class="pure-u-1">
                            <label for="motivo">Motivo Fuori Servizio</label>
                            <select id="motivo" data-bind="motivo" class="pure-input-1-2" required>
                                <option value="0">Manutenzione</option>
                                <option value="1">Taratura</option>
                                <option value="3">Fori ServizioStraordinario</option>
                            </select>
                        </div>

                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="inizio">Dal</label>
                            <input id="inizio" data-bind="inizio" class="pure-u-23-24" type="date" required disabled>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="utenteInizio">Inviato da</label>
                            <input id="utenteInizio" data-bind="utenteInizio" class="pure-u-23-24" type="text" disabled>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="fine">Al</label>
                            <input id="fine" data-bind="fine" class="pure-u-23-24" type="date" required>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="utenteFine">Inviato da</label>
                            <input id="utenteFine" data-bind="utenteFine" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="azienda">Taratore/Distributore</label>
                            <select id="azienda" data-bind="azienda" class="pure-input-1-2" required>
                                <option value="-1"></option>
                                ${this.aziende.map(v => this.renderOptions(v))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="riferimento">Apparecchio di riferimento</label>
                            <select id="riferimento" data-bind="riferimento" class="pure-input-1-2">
                                <option value="-1"></option>
                                ${this.apparecchiatureRif.map(v => this.renderOptions(v))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="necessariaVerifica" class="pure-checkbox">
                                <input id="necessariaVerifica" data-bind="necessariaVerifica" type="checkbox"> Necessaria
                                verifica intermedia dopo giorni
                                taratura
                            </label>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="giorniVerifica"></label>
                            <input id="giorniVerifica" data-bind="giorniVerifica" class="pure-u-23-24" min="0" type="number">
                        </div>

                        ${this.createDocumentiView()}

                    </div>
                    <input type="submit" class="pure-button pure-button-primary" value="Salva" />
                </fieldset>
            </form>
        `;
    }

    createViView() {
        return html`
        <form class="pure-form pure-form-stacked" @submit=${e => this.onsave(e)}>
            <fieldset>
                <legend>Verifica Intermedia</legend>
                <div class="pure-g">
                    ${this.createApparecchiaturaView()}
                    <div class="pure-u-1">
                        <label for="motivo">Motivo Fuori Servizio</label>
                        <select id="motivo" data-bind="motivo" class="pure-input-1-2" required>
                            <option value="2">Verifica Intermedia</option>
                        </select>
                    </div>

                    <div class="pure-u-1 pure-u-md-1-2">
                        <label for="inizio">Data verifica</label>
                        <input id="inizio" data-bind="inizio" class="pure-u-23-24" type="date" required>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-2">
                        <label for="utenteInizio">Verificato da</label>
                        <input id="utenteInizio" data-bind="utenteInizio" class="pure-u-23-24" type="text">
                    </div>
                    
                    <div class="pure-u-1 pure-u-md-1-2">
                            <label for="esito">Esito</label>
                            <select id="esito" data-bind="esito" class="pure-input-23-24" required>
                                <option value="0">Positivo</option>
                                <option value="1">Negativo</option>
                            </select>
                    </div>

                    <div class="pure-u-1 pure-u-md-1-2">
                        <label for="azienda">Taratore/Distributore</label>
                        <select id="azienda" data-bind="azienda" class="pure-input-1-2" required>
                            <option value="-1"></option>
                            ${this.aziende.map(v => this.renderOptions(v))}
                        </select>
                    </div>

                    ${this.createDocumentiView()}

                </div>
                <input type="submit" class="pure-button pure-button-primary" value="Salva" />
            </fieldset>
        </form>
        `;
    }
    createDocumentiView() {
        return html`
            <div class="pure-u-1">
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-2">
                            <fieldset>
                            <legend>Documentazione associata</legend>
                                <table  class="pure-table pure-table-horizontal">
                                    <thead>
                                        <th>nome</th>
                                        <th>file</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        ${this.uploads.map(row => this.createDocumentoRow(row))}
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <documento-create @add=${e => this.onAddDocumento(e)}></documento-create> 
                        </div>
                    </div>
                </fieldset>
            </div>
        `;
    }

    createApparecchiaturaView() {
        return html`
            <div class="pure-u-1">
                <div class="pure-g">
                    <div class="pure-u-1 pure-u-md-1-3 group-view">
                        <label>
                            <span class="label">Codice</span>
                            <span class="content">${this.apparecchiatura.codice}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-3 group-view">
                        <label>
                            <span class="label">Descrizione</span>
                            <span class="content">${this.apparecchiatura.descrizione}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-3 group-view">
                        <label>
                            <span class="label">Matricola</span>
                            <span class="content">${this.apparecchiatura.matricola}</span>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }

    createDocumentoRow({ id, denominazione, file }) {
        return html`
            <tr row-key=${id}>
                <td>${denominazione}</td>
                <td>${file}</td>
                <td><button @click=${e => this.onDeleteDocumento(e, id)} class="pure-button">elimina</button></td>
            </tr>
       `;
    }

    createStyle() {
        return html``;
    }
}
customElements.define('fuoriservizio-create', FuoriServizioCreateView)