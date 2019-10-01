import ApparecchiaturaService from './../services/ApparecchiaturaService.js'
import ApElementView from "./ApElementView.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js"
import SearchApparecchiature from "./SearchApparecchiature.js";
import Paginator from "./Paginator.js";

export default class ApparecchiaturaListView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new ApparecchiaturaService(params);
    }

    connectedCallback() {
        this.changeView();
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
            <div id="container"></div>
        `;
    }

    createDataView() {
        return html`
       <h1>Elenco Apparecchiature</h1>
        <table  class="pure-table pure-table-bordered">
            <thead>
                <th>codice</th>
                <th>descrizione</th>
                <th>tipologia</th>
                <th>matricola</th>
                <th>costruttore</th>
                <th>laboratorio</th>
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
                        <button  @click=${e => this.onCreate(e)} class='pure-button pure-button-primary'>Crea</button>
                        <button  @click=${e => this.onViewDetail(e)} class='pure-button pure-button-primary'>Dettagli</button>
                        <button  @click=${e => this.onDelete(e)} class='pure-button pure-button-primary'>Elimina</button>
                    </td>
                </tr>
            </tfoot>
        </table>
        `;
    }

    createRow({ id, codice, descrizione, tipologia, matricola, costruttore, laboratorio, dominio }) {
        return html`
            <tr row-key=${id} @click=${e => this.onRowClick(e, id)}>
                <td>${codice}</td>
                <td>${descrizione}</td>
                <td>${tipologia ? tipologia.denominazione : ''}</td>
                <td>${matricola}</td>
                <td>${costruttore ? costruttore.denominazione : ''}</td>
                <td>${laboratorio ? laboratorio.denominazione : ''}</td>
                <td>${dominio ? dominio.denominazione : ''}</td>
            </tr>
       `;
    }

    onRowClick(e, id) {
        this.selected = this.data.find(v => v.id === id);
        this.params.id = id;
        const old = this.root.querySelector("tr.selected");
        const selRow = this.root.querySelector(`[row-key="${id}"]`);
        if (old) {
            old.classList.toggle('selected');
        }
        selRow.classList.toggle('selected');
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
                render(this.createDataView(), this.root.getElementById('container'));
            })
    }

    onCreate(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'ApparecchiaturaCreate',
                params: this.params
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

    onViewDetail(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'Apparecchiatura',
                params: this.params
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

    onDelete(e) {
        e.preventDefault();
        console.log('ondelete...');
        this.service.delete(this.params.id).then(_ => {
            this.selected = null;
            this.params.id = null;
            this.loadData();
        });

    }
}
customElements.define('apparecchiatura-list', ApparecchiaturaListView);