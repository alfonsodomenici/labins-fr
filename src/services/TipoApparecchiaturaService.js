import AbstractService from './AbstractService.js';

export default class TipoApparecchiaturaService extends AbstractService{

    constructor({uri,idLab}){
        super();
        this.url += `${uri}/tipi-apparecchiatura`;
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