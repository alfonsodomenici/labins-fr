import RestService from './RestService.js';

export default class GrandezzaService extends RestService{

    constructor(){
        super();
        this.url += '/grandezze';
    }

    async all() {
        const resp = await fetch(this.url, {
            method: 'GET',
            headers: this.headers
        });
        return await resp.json();
    }
}