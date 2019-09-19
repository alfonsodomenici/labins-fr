import ApparecchiaturaService from './../services/ApparecchiaturaService.js'
import ApElementView from "./ApElementView.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js"
import SearchApparecchiature from "./SearchApparecchiature.js";
import Paginator from "./Paginator.js";

export default class ApparecchiaturaListView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new ApparecchiaturaService(params);
        this.pageSize = 10;
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

    createDataView(data) {
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
                ${data.map(row => this.createRow(row))}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="7">
                        <paginator-uv count="${this.count}" 
                            page="${this.pageSize}"
                            @paginator=${e => this.onPageChange(e)}>
                        </paginator-uv>
                    </td>
                </tr>
            </tfoot>
        </table>
        `;
    }

    createRow({ id,codice,descrizione,tipologia,matricola,costruttore,laboratorio,dominio }) {
        return html`
            <tr>
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

    onSearch(e) {
        console.log("onSearch()..");
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
                render(this.createDataView(json.apparecchiature), this.root.getElementById('container'));
            })
    }
}
customElements.define('apparecchiatura-list', ApparecchiaturaListView);