import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import ApparecchiaturaService from "../services/ApparecchiaturaService.js";

export default class ApparecchiaturaView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new ApparecchiaturaService(params);
    }

    connectedCallback() {
        Promise.all([
            this.service.find(this.params.id),
            this.service.findDocumenti(this.params.id)
        ]).then(values => {
            this.data = values[0];
            this.documenti = values[1].documenti;
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

    onDocumentoView(e,doc){
        e.preventDefault();
        this.service.downloadDocumento(this.params.id,doc.id)
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

    }
    onFuoriServizio(e) {

    }

    onDeroga(e) {

    }
    onVerificaIntermedia(e) {

    }
    onInServizio(e) {

    }

    createView() {
        return html`
            <article class="pure-g">
            <header class="pure-u-1">
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
            </header>
            <section class="pure-u-1 pure-u-md-1-2">
                <div class="pure-g">
                    <header class="pure-u-1">
                        <h3>Ubicazione</h3>
                    </header>
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
            </section>

            <section class="pure-u-1 pure-u-md-1-2">
                <div class="pure-g">
                    <header class="pure-u-1">
                        <h3>Campo di misura</h3>
                    </header>
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
            </section>

            <section class="pure-u-1 pure-u-md-1-2">
                <div class="pure-g">
                    <header class="pure-u-1">
                        <h3>Info sull'acquisto</h3>
                    </header>
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
            </section>

            <section class="pure-u-1 pure-u-md-1-2">
                <div class="pure-g">
                    <header class="pure-u-1">
                        <h3>Flags</h3>
                    </header>
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
            </section>

            ${this.createTaraturaView()}

            ${this.createManutenzioneView()}
            
            ${this.createDocumentiView()}

            <footer class="pure-u-1">
                <button  @click=${e => this.onUpdate(e)} class='pure-button pure-button-primary'>Modica</button>
                <button  @click=${e => this.onStorico(e)} class='pure-button pure-button-primary'>Storico</button>
                <button  @click=${e => this.onFuoriServizio(e)} class='pure-button pure-button-primary'>Fuori Servizio</button>
                <button  @click=${e => this.onDeroga(e)} class='pure-button pure-button-primary'>Deroga</button>
                <button  @click=${e => this.onVerificaIntermedia(e)} class='pure-button pure-button-primary'>Verifica Intermedia</button>
                <button  @click=${e => this.onInServizio(e)} class='pure-button pure-button-primary'>In Servizio</button>
                </footer>
            </article>
        `;
    }

    createTaraturaView(){
        if(this.data.taratura){
            return html`
                <section class="pure-u-1 pure-u-md-1-2">
                    <div class="pure-g">
                        <header class="pure-u-1">
                            <h3>Gestione Taratura</h3>
                        </header>
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
                                <span class="content">${this.data.gestioneTaratura.azienda}</span>
                            </label>
                        </div>
                    </div>
                </section>
            `;
        }else{
            return html``;
        }
    }

    createManutenzioneView(){
        if(this.data.manutenzione){
            return html`
                <section class="pure-u-1 pure-u-md-1-2">
                    <div class="pure-g">
                        <header class="pure-u-1">
                            <h3>Gestione Manutenzione</h3>
                        </header>
                        <div class="pure-u-1 group-view">
                            <label>
                                <span class="label">Tipo</span>
                                <span class="content">${this.data.gestioneManutenzione.tipo.denominazione}</span>
                            </label>
                        </div>
                        
                        ${this.createTipoGestioneView(this.data.gestioneManutenzione,true)}

                        <div class="pure-u-1 group-view">
                            <label>
                                <span class="label">Manutentore</span>
                                <span class="content">${this.data.gestioneManutenzione.azienda}</span>
                            </label>
                        </div>
                    </div>
                </section>
            `;
        }else{
            return html``;
        }
    }

    createTipoGestioneView(gest,flagManutenzione){
        if(gest.tipo.denominazione === 'TEMPORALE'){
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
        }else if(gest.tipo.denominazione === 'DESCRITTIVA'){
            return html`
                <div class="pure-u-1 group-view">
                    <label>
                        <span class="label">Descrizione</span>
                        <span class="content">${gest.descrizione}</span>
                    </label>
                </div>
            `;
        }
        if(flagManutenzione){
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

    createDocumentiView(){
        if(this.documenti){
            return html`
                <section class="pure-u-1 pure-u-md-1-2">
                    <div class="pure-g">
                        <header class="pure-u-1">
                            <h3>Documentazione associata</h3>
                        </header>

                        <div class="pure-u-1 group-view">
                            <ul>
                                ${this.documenti.map(d => html`<li><a @click=${e => this.onDocumentoView(e,d)} href="#">${d.denominazione}</a></li>`)}
                            </ul>
                        </div>
                    </div>
                </section>
            `;
        }else{
            return html``;
        }
    }
    createStyle() {
        return html``;
    }

    
}
customElements.define('apparecchiatura-view', ApparecchiaturaView);