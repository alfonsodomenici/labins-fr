import RestService from './RestService.js';

export default class CatenaMisuraService extends RestService{

    constructor({uri,idLab}){
        super();
        this.url += `${uri}/catene`;
        this.idLab = idLab;
    }

    async all() {
        return await this._getJsonData(this.url);
    }

    async find(id) {
        return await this._getJsonData(`${this.url}/${id}`);
    }
    
    async create(catena) {
        return await this._postJsonData(this.url, catena);
    }

    async update(catena) {
        return await this._putJsonData(`${this.url}/${catena.id}`,catena);
    }

    async delete(id) {
        return await this._deleteJsonData(`${this.url}/${id}`);
    }
}