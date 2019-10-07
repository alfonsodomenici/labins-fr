import LaboratorioService from './../services/LaboratorioService.js'
import ApElementView from "./ApElementView.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js"
import Paginator from "./Paginator.js";

export default class LaboratorioListView extends ApElementView {

    constructor() {
        super({});
        this.service = new LaboratorioService();
    }

    connectedCallback() {
        this.loadData();
    }

    loadData() {
        this.service.all()
            .then(json => {
                this.count = json.size;
                this.data = json.laboratori;
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
                link: 'LaboratorioCreate'
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
                link: 'LaboratorioUpdate',
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

    onViewApparecchiature(e) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'ApparecchiaturaList',
                params: {
                    uri: this.selected.link.uri,
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
        console.log('ondelete...');
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
        <h1>Elenco Laboratori</h1>
        <table  class="pure-table pure-table-bordered">
            <thead>
                <th>id</th>
                <th>denominazione</th>
            </thead>
            <tbody>
                ${this.data.map(row => this.createRow(row))}
            </tbody>
            <tfoot>
                <tr>
                    <td >
                        <paginator-uv count="${this.count}" 
                            page="${this.pageSize}"
                            @paginator=${e => this.onPageChange(e)}>
                        </paginator-uv>
                    </td>
                    <td >
                        <button  @click=${e => this.onCreate(e)} class='pure-button pure-button-primary'>Crea</button>
                        <button  @click=${e => this.onUpdate(e)} class='pure-button pure-button-primary'>Modifica</button>
                        <button  @click=${e => this.onViewApparecchiature(e)} class='pure-button pure-button-primary'>Apparecchiature</button>
                        <button  @click=${e => this.onDelete(e)} class='pure-button pure-button-primary'>Elimina</button>
                    </td>
                </tr>
            </tfoot>
        </table>
        `;
    }

    createRow({ id, denominazione }) {
        return html`
            <tr row-key=${id} @click=${e => this.onRowClick(e, id)}>
                <td>${id}</td>
                <td>${denominazione}</td>
            </tr>
       `;
    }
}
customElements.define('laboratorio-list', LaboratorioListView);