import Myi18n from './../Myi18n.js';
import { keycloak } from "./../app.js";

export default class RestService {

    constructor() {
        this.base = 'http://localhost:8080/labins/api';
        this.url = this.base;
        this.headers = new Headers();
        this.headers.set("Authorization", "Bearer " + keycloak.token);
        return new Proxy(this, this.handler);
    }

    async _getJsonData(endpoint) {
        const resp = await fetch(endpoint, {
            method: 'GET',
            mode: 'cors',
            cache: 'default',
            redirect: 'follow',
            headers: this.headers
        });
        if (!resp.ok) {
            throw new Error(response.statusText);
        }
        return await resp.json();
    }

    async _getBlobData(endpoint) {
        const resp = await fetch(endpoint, {
            method: 'GET',
            headers: this.headers
        });
        if (!resp.ok) {
            throw new Error(response.statusText);
        }
        return await resp.blob();
    }

    async _postJsonData(endpoint, json) {
        this.headers.set('Content-Type', 'application/json');
        const resp = await fetch(endpoint, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(json)
        });
        if (!resp.ok) {
            throw new Error(response.statusText);
        }
        return await resp.json();
    }

    async _postFormData(endpoint, formData) {
        this.headers.delete('Content-Type');
        const resp = await fetch(endpoint, {
            method: 'POST',
            headers: this.headers,
            body: formData
        });
        if (!resp.ok) {
            throw new Error(response.statusText);
        }
        return await resp.json();
    }

    async _putJsonData(endpoint, json) {
        this.headers.set('Content-Type', 'application/json');
        const resp = await fetch(endpoint, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(json)
        });
        if (!resp.ok) {
            throw new Error(response.statusText);
        }
        return await resp.json();
    }

    async _deleteJsonData(endpoint) {
        this.headers.delete('Content-Type');
        const resp = await fetch(endpoint, {
            method: 'DELETE',
            headers: this.headers
        });
        if (!resp.ok) {
            throw new Error(response.statusText);
        }
        return resp;
    }

    handler = {
        get(target, propKey, receiver) {
            if (typeof target[propKey] !== 'function') {
                return target[propKey];
            }
            const origMethod = target[propKey];
            const successMsg = Myi18n.getMessage(`${propKey}Success`);
            const failedMsg = Myi18n.getMessage(`${propKey}Failed`);
            return async (...args) => {
                try {
                    const start = performance.now();
                    target.fireLoadDataEvent(false);
                    await target.sleep(1000);
                    const result = await origMethod.apply(target, args);
                    const end = performance.now();
                    console.log(`${propKey} duration -> ${end - start}`);
                    if (successMsg) {
                        target.fireMessageEvent(successMsg, false);
                    }
                    return result;
                } catch (err) {
                    console.log(`${propKey} failed...`);
                    console.log(err);
                    if (failedMsg) {
                        target.fireMessageEvent(failedMsg, true);
                    }
                } finally {
                    target.fireLoadDataEvent(true);
                }
            };

        }
    }

    fireLoadDataEvent(end) {
        const event = new CustomEvent(
            'ap-loading', {
            detail: {
                end
            },
            bubbles: true,
            composed: true
        }
        );
        document.dispatchEvent(event);
    }

    fireMessageEvent(message, error) {
        const event = new CustomEvent(
            'ap-message', {
            detail: {
                message,
                error
            },
            bubbles: true,
            composed: true
        }
        );
        document.dispatchEvent(event);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}