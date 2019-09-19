import AbstractService from './AbstractService.js';

export default class DominioService extends AbstractService{

    constructor({uri,idLab}){
        super();
        this.url += `${uri}/domini`;
        this.idLab = idLab;
    }

    async all() {
        const resp = await fetch(this.url, {
            method: 'GET',
            headers: this.headers
        });
        return await resp.json();
    }
}