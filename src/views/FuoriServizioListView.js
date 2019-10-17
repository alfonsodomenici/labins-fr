import FuoriServizioService from './../services/FuoriServizioService.js'
import ApparecchiaturaService from "./../services/ApparecchiaturaService.js";
import ApElementView from "./../ApElementView.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js"
import Paginator from "./../Paginator.js";

export default class FuoriServizioListView extends ApElementView {

    constructor(params) {
        super(JSON.parse(JSON.stringify(params)));
        this.service = new FuoriServizioService({uri: this.params.suburi});
        this.appService = new ApparecchiaturaService(params);
    }

    connectedCallback() {
        this.criteria = {
            storico: true,
            start: 0,
            pageSize: this.pageSize
        };
        this.loadData();
    }

    loadData() {
        Promise.all([
            this.service.search(this.criteria),
            this.appService.find(this.params.id)
        ]).then(values => {
                this.count = values[0].size;
                this.data = values[0].fuoriServizi;
                this.apparecchiatura = values[1]
                this.changeView();
            });
    }

    onRowClick(e, id) {
        this.selected = this.data.find(v => v.id === id);
        this.params = {...this.params, idApparecchiatura: this.params.id, id: this.selected.id};
        console.log(this.params);
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
    
    onViewDetail(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'FuoriServizio',
                params: this.params
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
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
        <h1>Storico Fuori Servizio</h1>
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
        <hr />
        <table  class="pure-table pure-table-bordered">
            <thead>
                <th>Motivo</th>
                <th>Esito</th>
                <th>Inizio</th>
                <th>Fine</th>
            </thead>
            <tbody>
                ${this.data.map(row => this.createRow(row))}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">
                        <paginator-uv count="${this.count}" 
                            page="${this.pageSize}"
                            @paginator=${e => this.onPageChange(e)}>
                        </paginator-uv>
                    </td>
                    <td colspan="2">
                    <button  @click=${e => this.onViewDetail(e)} class='pure-button pure-button-primary'>Dettagli</button>
                    </td>
                </tr>
            </tfoot>
        </table>
        `;
    }

    createRow({ id, motivo, esito, inizio, fine }) {
        return html`
            <tr row-key=${id} @click=${e => this.onRowClick(e, id)}>
                <td>${motivo}</td>
                <td>${esito}</td>
                <td>${inizio}</td>
                <td>${fine}</td>
            </tr>
       `;
    }
}
customElements.define('fuoriservizio-list', FuoriServizioListView);