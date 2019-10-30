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
            params: { uri: this.params.uri, suburi: this.params.suburi }
        })
    }

    onUpdate(e) {
        e.preventDefault();
        this.fireApNavigationEvent({
            link: 'DominioCrud',
            params: this.params
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
        this.changeView();
    }

    /**
     * permission
     */

    checkCreateDisabled() {
        return false;
    }

    checkUpdateDisabled() {
        return this.selected === undefined ;
    }

    checkDeleteDisabled() {
        return this.selected === undefined ;
    }

    checkCateneMisuraDisabled() {
        return this.selected === undefined ;
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
                        ${this.checkCreateDisabled() ? 
                            html`<button  @click=${e => this.onCreate(e)} class='pure-button pure-button-primary' disabled>Crea</button>`:
                            html`<button  @click=${e => this.onCreate(e)} class='pure-button pure-button-primary'>Crea</button>`
                        }
                        ${this.checkUpdateDisabled() ? 
                            html`<button  @click=${e => this.onUpdate(e)} class='pure-button pure-button-primary' disabled>Modifica</button>`:
                            html`<button  @click=${e => this.onUpdate(e)} class='pure-button pure-button-primary'>Modifica</button>`
                        }
                        ${this.checkDeleteDisabled() ? 
                            html`<button  @click=${e => this.onDelete(e)} class='pure-button pure-button-primary' disabled>Elimina</button>`:
                            html`<button  @click=${e => this.onDelete(e)} class='pure-button pure-button-primary'>Elimina</button>`
                        }
                        ${this.checkCateneMisuraDisabled() ? 
                            html`<button  @click=${e => this.onViewCateneMisura(e)} class='pure-button pure-button-primary' disabled>Catene Misura</button>`:
                            html`<button  @click=${e => this.onViewCateneMisura(e)} class='pure-button pure-button-primary'>Catene Misura</button>`
                        }
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