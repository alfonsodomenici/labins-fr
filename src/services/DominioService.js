import RestService from './RestService.js';

export default class DominioService extends RestService{

    constructor({uri,idLab}){
        super();
        this.url += `${uri}/domini`;
    }

    async all() {
        return await this._getJsonData(this.url);
    }

    async find(id) {
        return await this._getJsonData(`${this.url}/${id}`);
    }
    
    async create(dominio) {
        return await this._postJsonData(this.url, dominio);
    }

    async update(dominio) {
        return await this._putJsonData(`${this.url}/${dominio.id}`,dominio);
    }

    async delete(id) {
        return await this._deleteJsonData(`${this.url}/${id}`);
    }
}