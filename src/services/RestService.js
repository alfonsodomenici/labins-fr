import Myi18n from './../Myi18n.js';
import { keycloak } from "./../app.js";

export default class RestService {

    constructor() {
        this.base = `${this.readOrigin()}/labins/api`;
        this.url = this.base;
        this.headers = new Headers();
        this.headers.set("Authorization", "Bearer " + keycloak.token);
        this.handler = {
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
                        const isTokenRefreshed = await keycloak.updateToken(30);
                        if(isTokenRefreshed){
                            console.log('token is refreshed...');
                            target.headers.set("Authorization", "Bearer " + keycloak.token);
                        }
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
        return new Proxy(this, this.handler);
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

    readOrigin() {
        if (RestService.origin === undefined) {
            let url = new URL(window.location.href);
            if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
                RestService.origin = 'http://localhost:8080';
            } else {
                RestService.origin = url.origin;
            }

        }
        return RestService.origin;
    }

    async _getJsonData(endpoint) {
        const resp = await fetch(endpoint, {
            method: 'GET',
            mode: 'cors',
            headers: this.headers
        });
        if (!resp.ok) {
            console.error('_getJsonData',resp.status,resp.statusText);
            throw new Error(resp.statusText);
        }
        return await resp.json();
    }

    async _getBlobData(endpoint) {
        const resp = await fetch(endpoint, {
            method: 'GET',
            headers: this.headers
        });
        if (!resp.ok) {
            console.error('_getBlobData',resp.status,resp.statusText);
            throw new Error(resp.statusText);
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
            console.error('_postJsonData',resp.status,resp.statusText);
            throw new Error(resp.statusText);
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
            console.error('_postFormData',resp.status,resp.statusText);
            throw new Error(resp.statusText);
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
            console.error('_putJsonData',resp.status,resp.statusText);
            throw new Error(resp.statusText);
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
            console.error('_deleteJsonData',resp.status,resp.statusText);
            throw new Error(resp.statusText);
        }
        return resp;
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