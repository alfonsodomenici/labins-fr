import ApElementView from "./../ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"
import CatenaMisuraService from './../services/CatenaMisuraService.js';

export default class CatenaMisuraListView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new CatenaMisuraService({ uri: this.params.suburi });
    }

    connectedCallback() {
        this.loadData();
    }

    loadData() {
        this.service.all()
            .then(json => {
                this.data = json.cateneMisura;
                this.count = json.size;
                this.changeView();
            })
    }

    onCreate(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'CatenaMisuraCrud',
            params: { uri: this.params.uri, suburi: this.params.suburi }
        })
    }

    onUpdate(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'CatenaMisuraCrud',
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

    onRowClick(e, id) {
        this.selected = this.data.find(v => v.id === id);
        const old = this.root.querySelector("tr.selected");
        const selRow = this.root.querySelector(`[row-key="${id}"]`);
        this.params = { ...this.params, id: id };
        if (old) {
            old.classList.toggle('selected');
        }
        selRow.classList.toggle('selected');
    }

    createView() {
        return html`
        <h1>Elenco Catene di Misura</h1>
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
customElements.define('catena-list', CatenaMisuraListView);