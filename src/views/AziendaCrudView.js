import ApElementView from "./../ApElementView.js";
import { html } from "./../lib/lit-html.js"
import AziendaService from "./../services/AziendaService.js";

export default class AziendaCrudView extends ApElementView {

    constructor(params) {
        super(params);
        this.service = new AziendaService();
        this.update = params.id !== undefined;
    }

    connectedCallback() {
        if (this.update === true) {
            this.service.find(this.params.id)
                .then(json => {
                    this.data = json;
                    this.changeView();
                    this.dataToUi(this.data);
                })
        } else {
            this.data = {};
            this.changeView();
        }
    }

    onsave(e) {
        e.preventDefault();
        this.uiToData(this.data);
        if (this.update === true) {
            this.service.update(this.data)
                .then(msg => console.log(msg));
        } else {
            this.service.create(this.data)
                .then(msg => console.log(msg));
        }
    }


    createView() {
        return html`
        <form class="pure-form pure-form-stacked" @submit=${e => this.onsave(e)}>
            <div class="pure-g">
                <div class="pure-u-1 pure-u-md-1-2">
                    <fieldset>
                        <legend>Informazioni</legend>
                        <div class="pure-g">
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="denominazione">Denominazione</label>
                                <input id="denominazione" data-bind="denominazione" required class="pure-u-23-24" type="text">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="contatto">Contatto</label>
                                <input id="contatto" data-bind="contatto" class="pure-u-23-24" type="text">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="telefono">Telefono</label>
                                <input id="telefono" data-bind="telefono" class="pure-u-23-24" type="text">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="email">Email</label>
                                <input id="email" data-bind="email" class="pure-u-23-24" type="email">
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="note">Note</label>
                                <textarea id="note" data-bind="note" class="pure-u-23-24"></textarea> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div class="pure-u-1 pure-u-md-1-2">
                    <fieldset>
                        <legend>Flags</legend>
                        <div class="pure-g">
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="costruttore" class="pure-checkbox">
                                    <input id="costruttore" data-bind="costruttore" type="checkbox"> Costruttore
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="taratore" class="pure-checkbox">
                                    <input id="taratore" data-bind="taratore" type="checkbox"> Taratore
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="manutentore" class="pure-checkbox">
                                    <input id="manutentore" data-bind="manutentore" type="checkbox"> Manutentore
                                </label>
                            </div>
                            <div class="pure-u-1 pure-u-md-1-2">
                                <label for="distributore" class="pure-checkbox">
                                    <input id="distributore" data-bind="distributore" type="checkbox"> Distributore
                                </label>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <input type="submit" value="Salva" class="pure-button pure-button-primary"/>
        </form>
        `;
    }

    createStyle() {
        return html``;
    }


}
customElements.define('azienda-crud', AziendaCrudView);