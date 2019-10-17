import AziendaService from './../services/AziendaService.js'
import ApElementView from "./../ApElementView.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js"
import SearchAziende from "./SearchAziende.js";
import Paginator from "./../Paginator.js";

export default class AziendaListView extends ApElementView {

    constructor() {
        super({});
        this.service = new AziendaService();
        this.criteria = {
            tipo: '',
            denominazione: '',
            start: 0,
            pageSize: this.pageSize
        }
    }

    connectedCallback() {
        this.loadData();
    }

    onSearch(e) {
        this.detail = e.detail
        this.criteria = e.detail;
        this.criteria.start = 0;
        this.criteria.pageSize = this.pageSize;
        this.loadData();
    }

    loadData() {
        this.service.search(this.criteria)
            .then(json => {
                this.count = json.size;
                this.data = json.aziende;
                this.changeView();
            });
    }

    onRowClick(e, id) {
        this.selected = this.data.find(v => v.id === id);
        const old = this.root.querySelector("tr.selected");
        const selRow = this.root.querySelector(`[row-key="${id}"]`);
        if (old) {
            old.classList.toggle('selected');
        }
        selRow.classList.toggle('selected');
    }

    onPageChange(e) {
        let currentPage = e.detail.cur;
        this.criteria.start = this.criteria.pageSize * currentPage;
        this.loadData();
    }

    onCreate(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'AziendaCreate'
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

    onUpdate(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'AziendaUpdate',
                params: {
                    id: this.selected.id
                }
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

    onDelete(e) {
        e.preventDefault();
        this.service.delete(this.selected.id).then(_ => {
            this.selected = null;
            this.loadData();
        });

    }
    
    createStyle() {
        return html`
            tbody > tr:hover{
                cursor: pointer;
                background: var(--hover-backgound-color,lightblue); 
            }
            tr.selected{
                background: var(--hover-backgound-color,lightblue);
            }
        `;
    }

    createView() {
        return html`
            ${this.createSearchView()}
            ${this.createDataView()}
        `;
    }

    createSearchView() {
        return html`
            <search-aziende @search=${e => this.onSearch(e)}></search-aziende>
        `;
    }

    createDataView() {
        return html`
        <h1>Elenco Aziende</h1>
        <table  class="pure-table pure-table-bordered">
            <thead>
                <th>id</th>
                <th>denominazione</th>
                <th>contatto</th>
                <th>telefono</th>
                <th>email</th>
                <th>note</th>
                <th>costruttore</th>
                <th>taratore</th>
                <th>manutentore</th>
                <th>distributore</th>
            </thead>
            <tbody>
                ${this.data.map(row => this.createRow(row))}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4">
                        <paginator-uv count="${this.count}" 
                            page="${this.pageSize}"
                            @paginator=${e => this.onPageChange(e)}>
                        </paginator-uv>
                    </td>
                    <td colspan="6">
                        <button  @click=${e => this.onCreate(e)} class='pure-button pure-button-primary'>Crea</button>
                        <button  @click=${e => this.onUpdate(e)} class='pure-button pure-button-primary'>Modifica</button>
                        <button  @click=${e => this.onDelete(e)} class='pure-button pure-button-primary'>Elimina</button>
                    </td>
                </tr>
            </tfoot>
        </table>
        `;
    }

    createRow({ id, denominazione, contatto, telefono, email, note, costruttore, taratore, manutentore, distributore }) {
        return html`
            <tr row-key=${id} @click=${e => this.onRowClick(e, id)}>
                <td>${id}</td>
                <td>${denominazione}</td>
                <td>${contatto}</td>
                <td>${telefono}</td>
                <td>${email}</td>
                <td>${note}</td>
                <td>${costruttore}</td>
                <td>${taratore}</td>
                <td>${manutentore}</td>
                <td>${distributore}</td>
            </tr>
       `;
    }
}
customElements.define('azienda-list', AziendaListView);