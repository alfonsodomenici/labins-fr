import ApElement from "./../ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class ApElementView extends ApElement {

    constructor(params) {
        super();
        this.params = params;
        this.pageSize = 10;
        console.log(params);
    }

    dataToUi(data) {
        this.fields = Array.from(this.root.querySelectorAll('[data-bind]'));
        if (data) {
            this.fields.forEach(v => {
                this.writeInputValue(v,Reflect.get(data, v.dataset.bind));
            });
        }
    }

    uiToData(data){
        this.fields.forEach(v => {
            console.dir(v)
            Reflect.set(data, v.dataset.bind, this.readInputValue(v));
        });
    }

    renderCheckbox(id, value, label) {
        if (value === true) {
            return html`<input id="${id}" type="checkbox" checked> ${label}`;
        } else {
            return html`<input id="${id}" type="checkbox" > ${label}`;
        };
    }

    renderOptions(v, selected) {
        if (selected && selected.id && v.id === selected.id) {
            return html`
                <option value="${v.id}" selected>
                    ${v.denominazione}
                </option value>
            `;
        } else {
            return html`
                <option value="${v.id}">
                    ${v.denominazione}
                </option value>
            `;
        }

    }

    readInputValue(input) {
        if (!input) {
            return null;
        }
        if (input.type === 'text' || input.type === 'textarea' || input.type === 'email' ) {
            return input.value;
        } else if (input.type === 'number') {
            return input.value ? input.value : null;
        } else if (input.type === 'checkbox') {
            return input.checked;
        }
        else if (input.type === 'date') {
            return input.value ? input.value : null;
        }
    }

    readSelectValue(select) {
        if (!select) {
            return null;
        }
        console.log(typeof select.value);
        return select.value ? { id: Number(select.value) } : null;
    }

    writeInputValue(input,value){
        if (!input) {
            return ;
        }
        if (input.type === 'checkbox') {
            input.checked = value;
        }else {
            input.value = value;
        }
    }
}
