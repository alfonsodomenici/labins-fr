import RestService from './RestService.js';

export default class LaboratorioService extends RestService{

    constructor(){
       super();
       this.url += '/laboratori';
    }

    async all() {
        return await this._getJsonData(this.url);
    }

    async find(id) {
        return await this._getJsonData(`${this.url}/${id}`);
    }

    async create(laboratorio) {
        return await this._postJsonData(this.url, laboratorio);
    }

    async update(laboratorio) {
        return await this._putJsonData(`${this.url}/${laboratorio.id}`,laboratorio);
    }

    async delete(id) {
        return await this._deleteJsonData(`${this.url}/${id}`);
    }
}