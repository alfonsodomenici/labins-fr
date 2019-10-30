import ApparecchiaturaService from './../services/ApparecchiaturaService.js'
import ApElementView from "./../ApElementView.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js"
import SearchApparecchiature from "./SearchApparecchiature.js";
import Paginator from "./../Paginator.js";

export default class ApparecchiaturaListView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new ApparecchiaturaService(params);
        this.criteria = {
            idDom: -1,
            idTipo: -1,
            idAz: -1,
            idDistr: -1,
            idMan: -1,
            idTar: -1,
            start: 0,
            pageSize: this.pageSize
        }
    }

    connectedCallback() {
        this.changeView();
        this.loadData();
    }

    onRowClick(e, id) {
        this.selected = this.data.find(v => v.id === id);
        this.params = { ...this.params, id: id, suburi: this.selected.link.uri };
        const old = this.root.querySelector("tr.selected");
        const selRow = this.root.querySelector(`[row-key="${id}"]`);
        if (old) {
            old.classList.toggle('selected');
        }
        selRow.classList.toggle('selected');
        render(this.createDataView(), this.root.querySelector('#data-container'));
    }

    onSearch(e) {
        this.detail = e.detail
        this.criteria = e.detail;
        this.criteria.start = 0;
        this.criteria.pageSize = this.pageSize;
        this.loadData();
    }

    onPageChange(e) {
        let currentPage = e.detail.cur;
        this.criteria.start = this.criteria.pageSize * currentPage;
        this.loadData();
    }

    loadData() {
        this.service.search(this.criteria)
            .then(json => {
                this.count = json.size;
                this.data = json.apparecchiature;
                render(this.createDataView(), this.root.querySelector('#data-container'));
            });
    }

    onCreate(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'ApparecchiaturaCreate',
            params: this.params
        })
    }

    onViewDetail(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'Apparecchiatura',
            params: this.params
        })
    }

    onDelete(e) {
        e.preventDefault();
        this.service.delete(this.params.id).then(_ => {
            this.selected = null;
            this.params.id = null;
            this.loadData();
        });

    }

    /**
     * permission
     */

    checkCreateDisabled() {
        return false;
    }

    checkDettagliDisabled() {
        return this.selected === undefined ;
    }

    checkDeleteDisabled() {
        return this.selected === undefined ;
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
        `;
    }

    createSearchView() {
        return html`
            <search-apparecchiature params="${JSON.stringify(this.params)}" @search=${e => this.onSearch(e)}></search-apparecchiature>
            <div id='data-container' class = 'pure-u-1'></div>
            `;
    }

    createDataView() {
        return html`
       <h1>Elenco Apparecchiature</h1>
        <table  class="pure-table pure-table-bordered">
            <thead>
                <th>data pianificata</th>
                <th>modello</th>
                <th>matricola</th>
                <th>descrizione</th>
                <th>codice</th>
                <th>firmware</th>
                <th>tipologia</th>
                <th>costruttore</th>
                <th>dominio</th>
            </thead>
            <tbody>
                ${this.data.map(row => this.createRow(row))}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">
                        <paginator-uv count="${this.count}" 
                            page="${this.pageSize}"
                            @paginator=${e => this.onPageChange(e)}>
                        </paginator-uv>
                    </td>
                    <td colspan="4">
                        ${this.checkCreateDisabled() ? 
                            html`<button  @click=${e => this.onCreate(e)} class='pure-button pure-button-primary' disabled>Crea</button>`:
                            html`<button  @click=${e => this.onCreate(e)} class='pure-button pure-button-primary'>Crea</button>`
                        }
                        ${this.checkDeleteDisabled() ? 
                            html`<button  @click=${e => this.onDelete(e)} class='pure-button pure-button-primary' disabled>Elimina</button>`:
                            html`<button  @click=${e => this.onDelete(e)} class='pure-button pure-button-primary'>Elimina</button>`
                        }
                        ${this.checkDettagliDisabled() ? 
                            html`<button  @click=${e => this.onViewDetail(e)} class='pure-button pure-button-primary' disabled>Dettagli</button>`:
                            html`<button  @click=${e => this.onViewDetail(e)} class='pure-button pure-button-primary'>Dettagli</button>`
                        }
                    </td>
                </tr>
            </tfoot>
        </table>
        `;
    }

    createRow({ id, dataPianificata, modello, matricola, descrizione, codice, firmware, tipologia, costruttore, laboratorio, dominio }) {
        return html`
            <tr row-key=${id} @click=${e => this.onRowClick(e, id)}>
                <td>${dataPianificata}</td>
                <td>${modello}</td>
                <td>${matricola}</td>
                <td>${descrizione}</td>
                <td>${codice}</td>
                <td>${firmware}</td>
                <td>${tipologia ? tipologia.denominazione : ''}</td>
                <td>${costruttore ? costruttore.denominazione : ''}</td>
                <td>${dominio ? dominio.denominazione : ''}</td>
            </tr>
       `;
    }
}
customElements.define('apparecchiatura-list', ApparecchiaturaListView);