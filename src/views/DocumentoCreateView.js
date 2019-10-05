import ApElementView from "./ApElementView.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class DocumentoCreateView extends ApElementView {

    constructor() {
        super({});
    }

    connectedCallback() {
        this.changeView();
    }

    oncreate(e){
        e.preventDefault();
        let doc = {};
        this.uiToData(doc);
        doc.mediaType = doc.fileData.type;
        doc.file = doc.fileData.name;
        doc.toupload = true;

        this.dispatchEvent(new CustomEvent('add', {
            bubbles: true,
            composed: true,
            detail: doc 
        }));

        doc = {};
        this.dataToUi(doc);
    }
    createView() {
        return html`
            <form @submit=${e => this.oncreate(e)} class="pure-form pure-form-stacked">
                <fieldset>
                    <legend>Aggiungi Documento</legend>
                    <div class="pure-g">
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="tipo">Tipo</label>
                            <select id="tipo" data-bind="tipo" class="pure-input-1-2" required>
                                <option value="0">Certificato</option>
                                <option value="1">Manuale Tecnico</option>
                            </select>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <label for="denominazione">Denominazione</label>
                            <input id="denominazione" data-bind="denominazione" class="pure-u-23-24" type="text" required>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <input id="file" class="pure-u-23-24" data-bind="fileData" type="file" required>
                        </div>
                        <div class="pure-u-1 pure-u-md-1-2">
                            <input type="submit" class="pure-button pure-button-primary" value="Aggiungi" />
                        </div>
                        
                    </div>
                </fieldset>
            </form>
        `;
    }

    createStyle() {
        return html``;
    }

}

customElements.define('documento-create', DocumentoCreateView);