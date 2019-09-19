import AbstractService from './AbstractService.js';

export default class LaboratorioService extends AbstractService{

    constructor(){
       super();
       this.url += '/laboratori';
    }

    async all() {
        const resp = await fetch(this.url, {
            method: 'GET',
            headers: this.headers
        });
        const promise = await resp.json();
        return promise;
    }
}