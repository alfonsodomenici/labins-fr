import ApElement from "./../ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js"

export default class ApElementView extends ApElement {

    constructor(params) {
        super();
        this.params = params;
        console.log(params);
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
        if (input.type === 'text') {
            return input.value;
        } else if (input.type === 'number') {
            return input.value ? input.value : null;
        } else if (input.type === 'checkbox') {
            console.log(input.value);
            return input.value && input.value === 'on' ? true : false;
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
}
