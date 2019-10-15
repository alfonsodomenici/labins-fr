import RestService from './RestService.js';

export default class DominioService extends RestService{

    constructor({uri,idLab}){
        super();
        this.url += `${uri}/domini`;
        this.idLab = idLab;
    }

    async all() {
        return await this._getJsonData(this.url);
    }
}