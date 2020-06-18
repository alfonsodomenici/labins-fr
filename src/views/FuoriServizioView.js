import ApElementView from "./../ApElementView.js";
import { html } from "./../lib/lit-html.js"
import ApparecchiaturaService from "../services/ApparecchiaturaService.js";
import FuoriServizioService from "./../services/FuoriServizioService.js";

export default class FuoriServizioView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new FuoriServizioService({ uri: this.params.suburi });
        this.appService = new ApparecchiaturaService(params);
    }

    connectedCallback() {
        Promise.all([
            this.service.find(this.params.id),
            this.service.findDocumenti(this.params.id),
            this.appService.find(this.params.idApparecchiatura)
        ]).then(values => {
            this.data = values[0];
            this.documenti = values[1].documenti;
            this.apparecchiatura = values[2];
            this.changeView();
        }
        );
    }

    onDocumentoView(e, doc) {
        e.preventDefault();
        this.service.downloadDocumento(this.params.id, doc.id)
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = doc.denominazione;
                this.root.appendChild(a);
                a.click();
                a.remove();
            });
    }


    createView() {
        return html`
            <article class="pure-g">
            <header class="pure-u-1">
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
            </header>
            <div class="pure-u-1 group-view">
                <label>
                    <span class="label">motivo</span>
                    <span class="content">${this.data.motivo.denominazione}</span>
                </label>
            </div>
            <section class="pure-u-1 pure-u-md-1-2">
                <div class="pure-g">
                    <header class="pure-u-1">
                        <h3>Periodo</h3>
                    </header>
                    <div class="pure-u-1 pure-u-md-1-2 group-view">
                        <label>
                            <span class="label">Dal</span>
                            <span class="content">${this.data.inizio}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-2 group-view">
                        <label>
                            <span class="label">Al</span>
                            <span class="content">${this.data.fine}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-2 group-view">
                        <label>
                            <span class="label">Inviato da</span>
                            <span class="content">${this.data.utenteInizio}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-2 group-view">
                        <label>
                            <span class="label">Inviato da</span>
                            <span class="content">${this.data.utenteFine}</span>
                        </label>
                    </div>
                </div>
            </section>

            <section class="pure-u-1 pure-u-md-1-2">
                <div class="pure-g">
                    <header class="pure-u-1">
                        <h3>Esito</h3>
                    </header>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Esito</span>
                            <span class="content">${this.data.esito ? this.data.esito.denominazione : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-2 group-view">
                        <label>
                            <span class="label">Data certificato</span>
                            <span class="content">${this.data.certificatoIl}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 pure-u-md-1-2 group-view">
                        <label>
                            <span class="label">Accreditato</span>
                            <span class="content">${this.data.accreditato}</span>
                        </label>
                    </div>
            </section>

            <section class="pure-u-1 pure-u-md-1-2">
                <div class="pure-g">
                    <header class="pure-u-1">
                        <h3>Riferimenti</h3>
                    </header>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Taratore/Manutentore</span>
                            <span class="content">${this.data.azienda ? this.data.azienda.denominazione : ''}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Apparecchio di riferimento</span>
                            <span class="content">${this.data.riferimento ? this.data.riferimento.denominazione : ''}</span>
                        </label>
                    </div>
                </div>
            </section>

            <section class="pure-u-1 pure-u-md-1-2">
                <div class="pure-g">
                    <header class="pure-u-1">
                        <h3>Verifica Intermedia</h3>
                    </header>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Necessaria verifica intermedia</span>
                            <span class="content">${this.data.necessariaVerifica}</span>
                        </label>
                    </div>
                    <div class="pure-u-1 group-view">
                        <label>
                            <span class="label">Giorni Verifica</span>
                            <span class="content">${this.data.giorniVerifica}</span>
                        </label>
                    </div>
                </div>
            </section>
            
            ${this.createDocumentiView()}

            <footer class="pure-u-1">
                
            </footer>
            </article>
        `;
    }

    createDocumentiView() {
        if (this.documenti) {
            return html`
                <section class="pure-u-1 pure-u-md-1-2">
                    <div class="pure-g">
                        <header class="pure-u-1">
                            <h3>Documentazione associata</h3>
                        </header>

                        <div class="pure-u-1 group-view">
                            <ul>
                                ${this.documenti.map(d => html`<li><a @click=${e => this.onDocumentoView(e, d)} href="#">${d.denominazione}</a></li>`)}
                            </ul>
                        </div>
                    </div>
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
customElements.define('fuoriservizio-view', FuoriServizioView);