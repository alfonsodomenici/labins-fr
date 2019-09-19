import DateFunction from "../DateFunction.js";
import DominioService from "./../services/DominioService.js";
import AziendaService from "./../services/AziendaService.js";
import TipoApperecchiaturaService from "./../services/TipoApparecchiaturaService.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js";


export default class SearchApparecchiature extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.oldSearch = {};
    }

    connectedCallback() {
        const params = JSON.parse(this.getAttribute('params'));
        this.domService = new DominioService(params);
        this.azService = new AziendaService();
        this.tappService = new TipoApperecchiaturaService(params);
        Promise.all([
            this.domService.all(),
            this.tappService.all(),
            this.azService.searchByTipo('costruttore'),
            this.azService.searchByTipo('distributore'),
            this.azService.searchByTipo('manutentore'),
            this.azService.searchByTipo('taratore'),
        ]).then(values => {
            this.domini = values[0];
            this.tipi = values[1];
            this.costruttori = values[2];
            this.distributori = values[3];
            this.manutentori = values[4];
            this.taratori = values[5];
            render(this.createView(), this.root);
        }
        );
    }

    createView() {
        return html`
                <form method="POST" @submit=${e => this.onsearch(e)} class='pure-form'>
                    <legend>Parametri Ricerca</legend>
                    <label>Dominio    
                        <select name="dominio">
                        <option value='-1' >nessun dominio</option>
                        ${this.domini.map(p => html`<option value="${p.id}">${p.denominazione}</option value>`)}                        
                        </select>
                    </label>
                    <label>Tipo    
                        <select name="tipo">
                        <option value='-1' >nessun tipo</option>
                        ${this.tipi.map(p => html`<option value="${p.id}">${p.descrizione}</option value>`)}                        
                        </select>
                    </label>
                    <label>Costruttore    
                        <select name="costruttore">
                        <option value='-1' >nessun costruttore</option>
                        ${this.costruttori.aziende.map(p => html`<option value="${p.id}">${p.denominazione}</option value>`)}                        
                        </select>
                    </label>
                    <label>Distributore    
                        <select name="distributore">
                        <option value='-1' >nessun distributore</option>
                        ${this.distributori.aziende.map(p => html`<option value="${p.id}">${p.denominazione}</option value>`)}                        
                        </select>
                    </label>
                    <label>Manutentore    
                        <select name="manutentore">
                        <option value='-1' >nessun manutentore</option>
                        ${this.manutentori.aziende.map(p => html`<option value="${p.id}">${p.denominazione}</option value>`)}                        
                        </select>
                    </label>
                    <label>Taratore    
                        <select name="taratore">
                        <option value='-1' >nessun taratore</option>
                        ${this.taratori.aziende.map(p => html`<option value="${p.id}">${p.denominazione}</option value>`)}                        
                        </select>
                    </label>
                    
                    <input type="submit" class='pure-button pure-button-primary' value="Cerca" />
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