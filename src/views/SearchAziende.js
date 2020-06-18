import { html } from "./../lib/lit-html.js"
import ApElement from "../ApElement.js";

export default class SearchAziende extends ApElement {

    constructor() {
        super();
        this.oldSearch = {};
        this.visible = false;
    }

    connectedCallback() {
        this.changeView();
        this.containerElement = this.root.querySelector('#container');
        this.containerElement.style.display = 'none'
    }

    ontoggle(e) {
        this.containerElement.style.display = this.visible ? 'none' : 'block';
        this.visible = !this.visible;
        this.changeView();
    }

    createStyle() {
        return html``;
    }

    createView() {
        return html`
        <button @click=${(e) => this.ontoggle(e)} class='pure-button pure-button-primary'>${this.visible ? 'nascondi filtri' : 'visualizza filtri'}</button>
                <form id='container' method="POST" @submit=${e => this.onsearch(e)} class='pure-form pure-form-stacked'>
                    <fieldset>
                        <legend>Parametri Ricerca</legend>
                        <div class="pure-g">
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label>Tipo
                                    <select name="tipo">
                                        <option value=''>nessun tipo</option>
                                        <option value='costruttore'>costruttore</option>
                                        <option value='distributore'>distributore</option>
                                        <option value='manutentore'>manutentore</option>
                                        <option value='taratore'>taratore</option>
                                    </select>
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for='denominazione'>Denominazione</label>
                                <input id='denominazione' type='text' />
                            </div>
                            <div class="pure-u-1">
                                <input type="submit" class='pure-button pure-button-primary' value="Cerca" />
                            </div>
                        </div>
                    </fieldset>
                </form>
            `;
    }

    onsearch(e) {
        e.preventDefault();
        const { tipo, denominazione } = e.target.elements;
        if (this.isChange(tipo, denominazione)) {
            this.dispatchEvent(new CustomEvent('search', {
                bubbles: true,
                composed: true,
                detail: {
                    tipo: tipo.value,
                    denominazione: denominazione.value
                }
            }));
        }
    }

    isChange(tipo, denominazione) {
        const search = {
            tipo: tipo.value,
            denominazione: denominazione.value
        };
        const change = JSON.stringify(this.oldSearch) !== JSON.stringify(search);
        this.oldSearch = search;
        return change;
    }
}
customElements.define('search-aziende', SearchAziende);