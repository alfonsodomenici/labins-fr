import RestService from './RestService.js';

export default class TipoApparecchiaturaService extends RestService{

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