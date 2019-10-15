import ApElement from "./../ApElement.js";
import { html } from "./../../node_modules/lit-html/lit-html.js";
import DateFunction from "./../DateFunction.js";

export default class ApElementView extends ApElement {

    constructor(params) {
        super();
        this.params = params;
        this.pageSize = 10;
        console.log(params);
    }

    changeView() {
        super.changeView();
        this.fields = Array.from(this.root.querySelectorAll('[data-bind]'));
    }

    dataToUi(data) {
        if (data) {
            this.fields.forEach(v => {
                if (v instanceof HTMLInputElement) {
                    this.writeInputValue(v, this.getVal(data, v.dataset.bind));
                } else if (v instanceof HTMLSelectElement) {
                    this.writeSelectValue(v, this.getVal(data, v.dataset.bind));
                }
            });
        }
    }

    uiToData(data) {
        this.fields.forEach(v => {
            //console.dir(v)
            if (v instanceof HTMLInputElement || v instanceof HTMLTextAreaElement) {
                //Reflect.set(data, v.dataset.bind, this.readInputValue(v));
                this.setVal(data, this.readInputValue(v), v.dataset.bind)
            } else if (v instanceof HTMLSelectElement) {
                //Reflect.set(data, v.dataset.bind, this.readSelectValue(v));
                this.setVal(data, this.readSelectValue(v), v.dataset.bind)
            }
        });
    }

    /**
     * 
     * @param {*} object 
     * @param {*} path 
     */
    getVal(object, path) {
        return path.split('.').reduce((res, prop) => (res && res[prop] !== undefined) ? res[prop] : null, object);
    }

    setVal(object = {}, value, path) {
        const [head, ...rest] = path.toString().split('.');
        if (!rest.length) {
            object[head] = value
        } else {
            if (!object[head]) {
                object[head] = {};
            }
            this.setVal(object[head], value, rest);
        }
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
        if (input.type === 'text' || input.type === 'textarea' || input.type === 'email') {
            return input.value;
        } else if (input.type === 'number') {
            return input.value ? input.value : null;
        } else if (input.type === 'checkbox') {
            return input.checked;
        } else if (input.type === 'date') {
            return input.value ? input.value : null;
        } else if (input.type === 'file') {
            return input.files[0]
        }
    }

    writeInputValue(input, value) {
        if (!input) {
            return;
        }
        if (input.type === 'checkbox') {
            input.checked = value;
        } else {
            input.value = value;
        }
    }

    readSelectValue(select) {
        if (!select) {
            return null;
        }
        return select.value ? DateFunction.isNumeric(select.value) ? { id: Number(select.value) } : select.value : null;
    }

    writeSelectValue(select, value) {
        if (!select) {
            return;
        }
        select.value = value ? value.id : null;
    }
}
