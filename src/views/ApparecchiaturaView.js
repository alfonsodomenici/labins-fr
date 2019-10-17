import ApElementView from "./../ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import ApparecchiaturaService from "../services/ApparecchiaturaService.js";
import FuoriServizioService from "./../services/FuoriServizioService.js";

export default class ApparecchiaturaView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new ApparecchiaturaService(params);
        this.fsService = new FuoriServizioService({ uri: this.params.suburi });
    }

    connectedCallback() {
        Promise.all([
            this.service.find(this.params.id),
            this.service.findDocumenti(this.params.id),
            this.fsService.status()
        ]).then(values => {
            this.data = values[0];
            this.documenti = values[1].documenti;
            this.fsStatus = values[2];
            this.changeView();
        }
        );
    }

    onUpdate(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'ApparecchiaturaUpdate',
                params: this.params
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

    onDocumentoView(e, doc) {
        e.preventDefault();
        this.service.downloadDocumento(this.params.id, doc.id)
            .then(blob => {
                console.dir(blob)
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = doc.denominazione;
                this.root.appendChild(a);
                a.click();
                a.remove();
            });
    }

    onDelete(e) {

    }

    onStorico(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'FuoriServizioList',
                params: this.params
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

    onFuoriServizio(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'FuoriServizioCreate',
                params: {...this.params, view: 'fs'}
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

    onDeroga(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'DerogaCreate',
                params: this.params
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

    onVerificaIntermedia(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'FuoriServizioCreate',
                params: {...this.params, view: 'vi'}
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }
    
    onInServizio(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'FuoriServizioCreate',
                params: {...this.params, view: 'ris'}
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

    checkUpdateDisabled() {
        return ``;
    }
    checkStoricoDisabled() {
        return this.fsStatus.isStoricoEmpty ? ` pure-button-disabled` : ``;
    }
    checkFuoriServizioDisabled() {
        return (this.fsStatus.isFuoriServizio) ? ` pure-button-disabled` : ``;
    }
    checkDerogaDisabled() {
        return (this.fsStatus.isFuoriServizio) ? ` pure-button-disabled` : ``;
    }
    checkVerificaIntermediaDisabled() {
        return (this.fsStatus.isFuoriServizio || !this.fsStatus.isViRequired) ? ` pure-button-disabled` : ``;
    }
    checkRimettiInServizioDisabled() {
        return this.fsStatus.isFuoriServizio === false ? ` pure-button-disabled` : ``;
    }


    createView() {
        return html`
            <article class="pure-g pure-form">
            <header class="pure-u-1">
                <fieldset>
                    <legend>Dati Apparecchiatura</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-2 group-view">
                            <label>
                                <span class="label">Modello</span>
                                <span class="content">${this.data.modello}</span>
                            </label>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2 group-view">
                            <label>
                                <span class="label">Matricola</span>
                                <span class="content">${this.data.matricola}</span>
                            </label>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2 group-view">
                            <label>
                                <span class="label">Descrizione</span>
                                <span class="content">${this.data.descrizione}</span>
                            </label>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2 group-view">
                            <label>
                                <span class="label">Codice</span>
                                <span class="content">${this.data.codice}</span>
                            </label>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2 group-view">
                            <label>
                                <span class="label">Firmware</span>
                                <span class="content">${this.data.firmware}</span>
                            </label>
                        </div>
                    </div>
                </fieldset>
            </header>
            <section class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                <legend>Ubicazione</legend>
                <div class="pure-g">
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Laboratorio</span>
                            <span class="content">${this.data.laboratorio.denominazione}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Dominio</span>
                            <span class="content">${this.data.dominio ? this.data.dominio.denominazione : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Catena di Misura</span>
                            <span class="content">${this.data.cateneMisura.length !== 0 ? this.data.cateneMisura.toString() : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Tipologia</span>
                            <span class="content">${this.data.tipologia ? this.data.tipologia.denominazione : ''}</span>
                        </label>
                    </div>
                </div>
                </fieldset>
            </section>

            <section class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                <legend>Campo di misura</legend>
                <div class="pure-g">
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Grandezza</span>
                            <span class="content">${this.data.grandezza ? this.data.grandezza.denominazione : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Campo operativo</span>
                            <span class="content">${this.data.campoOperativo ? this.data.campoOperativo : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Min-Max</span>
                            <span class="content">${this.data.campoMin}:${this.data.campoMax}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Unita di misura</span>
                            <span class="content">${this.data.um ? this.data.um.denominazione : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Incertezza</span>
                            <span class="content">${this.data.incertezza ? this.data.incertezza : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Criteri accettazione</span>
                            <span class="content">${this.data.criterioAccettazione ? this.data.criterioAccettazione : ''}</span>
                        </label>
                    </div>
                </div>
                </fieldset>
            </section>

            <section class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                <legend>Info sull'acquisto</legend>
                <div class="pure-g">
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Data fabbricazione</span>
                            <span class="content">${this.data.fabbricatoIl ? this.data.fabbricatoIl : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Data acquisto</span>
                            <span class="content">${this.data.acquistatoIl ? this.data.acquistatoIl : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Entrata in funzione</span>
                            <span class="content">${this.data.inFunzioneDal ? this.data.inFunzioneDal : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Costruttore</span>
                            <span class="content">${this.data.costruttore ? this.data.costruttore.denominazione : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Distributore</span>
                            <span class="content">${this.data.distributore ? this.data.distributore.denominazione : ''}</span>
                        </label>
                    </div>
                </div>
                </fieldset>
            </section>

            <section class="pure-u-1 pure-u-md-1-2">
                <fieldset>
                <legend>Flags</legend>
                <div class="pure-g">
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Soggetta a Taratura</span>
                            <span class="content">${this.data.taratura}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Soggetta a Manutenzione</span>
                            <span class="content">${this.data.manutenzione}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Apparecchiatura di riferimento</span>
                            <span class="content">${this.data.riferimento}</span>
                        </label>
                    </div>
                </div>
                <fieldset>
            </section>

            ${this.createTaraturaView()}

            ${this.createManutenzioneView()}
            
            ${this.createDocumentiView()}

            <footer class="pure-u-1">
                <button  @click=${e => this.onUpdate(e)} class='pure-button pure-button-primary ${this.checkUpdateDisabled()}'>Modica</button>
                <button  @click=${e => this.onStorico(e)} class='pure-button pure-button-primary ${this.checkStoricoDisabled()}'>Storico</button>
                <button  @click=${e => this.onFuoriServizio(e)} class='pure-button pure-button-primary ${this.checkFuoriServizioDisabled()}'>Fuori Servizio</button>
                <button  @click=${e => this.onDeroga(e)} class='pure-button pure-button-primary ${this.checkDerogaDisabled()}'>Deroga</button>
                <button  @click=${e => this.onVerificaIntermedia(e)} class='pure-button pure-button-primary ${this.checkVerificaIntermediaDisabled()}'>Verifica Intermedia</button>
                <button  @click=${e => this.onInServizio(e)} class='pure-button pure-button-primary ${this.checkRimettiInServizioDisabled()}'>Rimessa In Servizio</button>
                </footer>
            </article>
        `;
    }

    createTaraturaView() {
        if (this.data.taratura) {
            return html`
                <section class="pure-u-1 pure-u-md-1-2">
                    <fieldset>
                    <legend>Gestione Taratura</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 group-view">
                            <label>
                                <span class="label">Tipo</span>
                                <span class="content">${this.data.gestioneTaratura.tipo.denominazione}</span>
                            </label>
                        </div>
                        
                        ${this.createTipoGestioneView(this.data.gestioneTaratura)}

                        <div class="pure-u-1 group-view">
                            <label>
                                <span class="label">Taratore</span>
                                <span class="content">${this.data.gestioneTaratura.azienda ? this.data.gestioneTaratura.azienda.denominazione : '' }</span>
                            </label>
                        </div>
                    </div>
                    </fieldset>
                </section>
            `;
        } else {
            return html``;
        }
    }

    createManutenzioneView() {
        if (this.data.manutenzione) {
            return html`
                <section class="pure-u-1 pure-u-md-1-2">
                    <fieldset>
                    <legend>Gestione Manutenzione</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 group-view">
                            <label>
                                <span class="label">Tipo</span>
                                <span class="content">${this.data.gestioneManutenzione.tipo.denominazione}</span>
                            </label>
                        </div>
                        
                        ${this.createTipoGestioneView(this.data.gestioneManutenzione, true)}

                        <div class="pure-u-1 group-view">
                            <label>
                                <span class="label">Manutentore</span>
                                <span class="content">${this.data.gestioneManutenzione.azienda}</span>
                            </label>
                        </div>
                    </div>
                    </fieldset>
                </section>
            `;
        } else {
            return html``;
        }
    }

    createTipoGestioneView(gest, flagManutenzione) {
        if (gest.tipo.denominazione === 'TEMPORALE') {
            return html`
                <div class="pure-u-1 group-view">
                    <label>
                        <span class="label">Data Pianificata</span>
                        <span class="content">${gest.dataPianificata}</span>
                    </label>
                </div>
                <div class="pure-u-1 group-view">
                    <label>
                        <span class="label">Frequenza</span>
                        <span class="content">${gest.freq}</span>
                    </label>
                </div>
            `;
        } else if (gest.tipo.denominazione === 'DESCRITTIVA') {
            return html`
                <div class="pure-u-1 group-view">
                    <label>
                        <span class="label">Descrizione</span>
                        <span class="content">${gest.descrizione}</span>
                    </label>
                </div>
            `;
        }
        if (flagManutenzione) {
            return html`
                <div class="pure-u-1 group-view">
                    <label>
                        <span class="label">Tipo Attivita</span>
                        <span class="content">${gest.attivita}</span>
                    </label>
                </div>
            `;
        }
    }

    createDocumentiView() {
        if (this.documenti) {
            return html`
                <section class="pure-u-1 pure-u-md-1-2">
                    <fieldset>
                    <legend>Documentazione associata</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 group-view">
                            <ul>
                                ${this.documenti.map(d => html`<li><a @click=${e => this.onDocumentoView(e, d)} href="#">${d.denominazione}</a></li>`)}
                            </ul>
                        </div>
                    </div>
                    </fieldset>
                </section>
            `;
        } else {
            return html``;
        }
    }
    createStyle() {
        return html``;
    }


}
customElements.define('apparecchiatura-view', ApparecchiaturaView);