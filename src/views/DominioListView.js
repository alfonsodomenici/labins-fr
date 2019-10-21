import ApElementView from "./../ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import DominioService from './../services/DominioService.js';

export default class DominioListView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new DominioService(params);
    }

    connectedCallback() {
        this.loadData();
    }

    loadData() {
        this.service.all()
            .then(json => {
                this.data = json.domini;
                this.count = json.size;
                this.changeView();
            })
    }

    onCreate(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'DominioCrud',
            params: this.params
        })
    }

    onUpdate(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'DominioCrud',
            params: { ...this.params, id: this.selected.id }
        })
    }

    onDelete(e) {
        e.preventDefault();
        this.service.delete(this.selected.id).then(_ => {
            this.selected = null;
            this.loadData();
        });

    }

    onViewCateneMisura(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'CatenaMisuraList',
            params: this.params
        })
    }

    onRowClick(e, id) {
        this.selected = this.data.find(v => v.id === id);
        const old = this.root.querySelector("tr.selected");
        const selRow = this.root.querySelector(`[row-key="${id}"]`);
        this.params = { ...this.params, id: id, suburi: this.selected.link.uri };
        if (old) {
            old.classList.toggle('selected');
        }
        selRow.classList.toggle('selected');
    }

    createView() {
        return html`
        <h1>Elenco Domini</h1>
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
                        <button  @click=${e => this.onViewCateneMisura(e)} class='pure-button pure-button-primary'>Catene Misura</button>
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
}
customElements.define('dominio-list', DominioListView);