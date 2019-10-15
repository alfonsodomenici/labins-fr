import RestService from './RestService.js';

export default class TipoApparecchiaturaService extends RestService{

    constructor({uri,idLab}){
        super();
        this.url += `${uri}/tipi-apparecchiatura`;
        this.idLab = idLab;
    }

    async all() {
        return await this._getJsonData(this.url);
    }
}