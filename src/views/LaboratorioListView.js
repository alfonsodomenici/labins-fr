import ApElementView from "./ApElementView.js";
import { html, render } from "./../../node_modules/lit-html/lit-html.js"
import LaboratorioService from "./../services/LaboratorioService.js";

export default class LaboratorioListView extends ApElementView {

    constructor() {
        super();
        this.service = new LaboratorioService();
    }

    connectedCallback() {
        this.service.all()
            .then(data => {
                this.data = data.laboratori;
                this.changeView();
            });
    }

    createView() {
        return html`
            <h1>Elenco Laboratori</h1>
            <ul>
                ${this.data.map(lab => this.createLabView(lab))}
            </ul>
        `;
    }

    createStyle() {
        return html`
            ul{
                list-style: none;
            }
            div{
                margin: .2em;
                padding: .5em;
                border: 1px solid black;
            }
            div:hover{
                background: lightgreen;
            }
        `;
    }


    createLabView(lab) {
        return html`
            <li>
                <div>
                    <h3>${lab.denominazione}</h3>
                    <p>${lab.link.uri}</p>
                    <button 
                        @click=${e => this.onViewApparecchiature(e, lab)}
                        class='pure-button pure-button-primary'>Apparecchiature</button>
                </div>
            </li>
        `;
    }

    onViewApparecchiature(e, lab) {
        e.preventDefault();
        const event = new CustomEvent(
            'ap-navigation', {
            detail: {
                link: 'ApparecchiaturaList',
                params: {
                    uri: lab.link.uri,
                    idLab: lab.id
                }
            },
            bubbles: true,
            composed: true
        }
        );
        this.dispatchEvent(event);
    }

}

customElements.define('laboratorio-list', LaboratorioListView);

