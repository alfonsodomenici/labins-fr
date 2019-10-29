import ApElementView from "./../ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import ApparecchiaturaService from "./../services/ApparecchiaturaService.js";
import DocumentoCreateView from "./DocumentoCreateView.js";
import AziendaService from "./../services/AziendaService.js";
import FuoriServizioService from "./../services/FuoriServizioService.js";

export default class FuoriServizioUpdateView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new FuoriServizioService({ uri: this.params.suburi });
        this.appService = new ApparecchiaturaService(params);
        this.azService = new AziendaService();
        this.uploads = [];
        this.documenti = [];
        this.motivo = 0;
        this.motivoOptions = [{ id: 0, denominazione: 'Manutenzione' }, { id: 1, denominazione: 'Taratura' }, { id: 2, denominazione: 'Verifica Intermedia' }, { id: 3, denominazione: 'Fuori Servizio Straordinario' }];
        this.esitoOptions = [{ id: 0, denominazione: 'Positivo' }, { id: 1, denominazione: 'Negativo' }];
        this.ris = false;
    }

    connectedCallback() {
        this.loadData();
    }

    loadData() {
        this.service.findLastFuoriServizio()
            .then((json) => {
                this.data = json;
                return Promise.all([
                    this.azService.all(),
                    this.appService.findDiRiferimento(),
                    this.appService.find(this.params.id),
                    this.service.findDocumenti(this.data.id)
                ])
            }).then(values => {
                this.aziende = values[0].aziende;
                this.apparecchiatureRif = values[1];
                this.apparecchiatura = values[2];
                this.documenti = values[3].documenti;
                this.changeView();
                this.dataToUi(this.data);
            }
            );
    }

    onsave(e) {
        e.preventDefault();
        this.uiToData(this.data);
        this.service.updateDocumenti(this.data.id, this.uploads, this.documenti.filter(v => v.todelete))
            .then(() => Promise.all([
                this.service.update(this.data),
                this.service.findDocumenti(this.data.id)
            ]))
            .then(values => {
                this.data = values[0];
                this.documenti = values[1].documenti;
                this.uploads = [];
                this.changeView();
                this.dataToUi(this.data);
            })
    }

    onFineChange(e) {
        console.log('validate fine..');
        const elFine = e.path[0];
        const elInizio = this.fields.filter(v => v.getAttribute('data-bind') === 'inizio')[0];
        if (this.readInputValue(elInizio) >= this.readInputValue(elFine)) {
            elFine.setCustomValidity("La data deve essere successiva alla data di Inizio Fuori servizio");
        } else {
            elFine.setCustomValidity('');
        }
        this.changeView();
    }

    onNecessariaViChange(e) {
        this.uiToData(this.data);
        this.changeView();
    }

    onRisChange(e){
        const el = e.path[0];
        this.ris = this.readInputValue(el);
        this.changeView();
    }

    onAddDocumento(e) {
        this.uploads.push(e.detail);
        this.changeView();
    }

    onDeleteDocumento(e, id) {
        e.preventDefault();
        this.uploads = this.uploads.filter(v => v.id !== id);
        this.changeView();
    }

    createView() {
        return html`
            <form class="pure-form pure-form-stacked" @submit=${e => this.onsave(e)}>
                <fieldset>
                    <legend>Rimessa in Servizio</legend>
                    <div class="pure-g">
                        ${this.createApparecchiaturaView()}
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="motivo">Motivo Fuori Servizio</label>
                            <select id="motivo" data-bind="motivo" class="pure-input-1-2" required>
                                <option value="0">Manutenzione</option>
                                <option value="1">Taratura</option>
                                <option value="3">Fori ServizioStraordinario</option>
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="ris" class="pure-checkbox">
                                <input id="ris" @change=${e => this.onRisChange(e)} type="checkbox"> Rimetti in servizio
                            </label>
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
                            ${this.ris === true ?
                                html`<input id="fine" @change=${e => this.onFineChange(e)} data-bind="fine" class="pure-u-23-24" type="date" required>` :
                                html`<input id="fine" @change=${e => this.onFineChange(e)} data-bind="fine" class="pure-u-23-24" type="date" >`}
                            
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="utenteFine">Inviato da</label>
                            <input id="utenteFine" data-bind="utenteFine" class="pure-u-23-24" type="text">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="esito">Esito</label>
                            <select id="esito" data-bind="esito" class="pure-input-23-24" required>
                                <option value="-1"></option>
                                ${this.esitoOptions.map(v => this.renderOptions(v))}
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="certificatoIl">Data certificato</label>
                            <input id="certificatoIl" data-bind="certificatoIl" class="pure-u-23-24" type="date">
                        </div>
                        <div class="pure-u-1 pure-u-md-1-3">
                            <label for="accreditato" class="pure-checkbox">
                                <input id="accreditato" data-bind="accreditato" type="checkbox"> Accreditato
                            </label>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="azienda">Taratore/Distributore</label>
                            ${this.ris === true ? 
                                html`<select id="azienda" data-bind="azienda" class="pure-input-1-2" required>
                                        <option value="-1"></option>
                                        ${this.aziende.map(v => this.renderOptions(v))}
                                    </select>`:
                                html`<select id="azienda" data-bind="azienda" class="pure-input-1-2">
                                    <option value="-1"></option>
                                    ${this.aziende.map(v => this.renderOptions(v))}
                                </select>`}
                            
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
                                <input id="necessariaVerifica" @change=${e => this.onNecessariaViChange(e)} data-bind="necessariaVerifica" type="checkbox"> Necessaria
                                verifica intermedia dopo giorni
                                taratura
                            </label>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-4">
                            <label for="giorniVerifica"></label>
                            ${this.data.necessariaVerifica === true ?
                                html`<input id="giorniVerifica" data-bind="giorniVerifica" class="pure-u-23-24" min="1" type="number" required >`
                                : html`<input id="giorniVerifica" data-bind="giorniVerifica" class="pure-u-23-24" min="1" type="number" disabled >`}
                            
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
                                        ${this.documenti.filter(v => !v.todelete).map(row => this.createDocumentoRow(row))}
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
customElements.define('fuoriservizio-update', FuoriServizioUpdateView)