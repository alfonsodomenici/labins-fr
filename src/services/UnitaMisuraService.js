import AbstractService from './AbstractService.js';

export default class UnitaMisuraService extends AbstractService{

    constructor(){
        super();
        this.url += '/unita-misura';
    }

    async all() {
        const resp = await fetch(this.url, {
            method: 'GET',
            headers: this.headers
        });
        return await resp.json();
    }
}