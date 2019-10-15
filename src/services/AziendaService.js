import RestService from './RestService.js';

export default class AziendaService extends RestService {

    constructor() {
        super();
        this.url += '/aziende';
    }

    async all() {
        return await this._getJsonData(this.url);
    }

    async searchByTipo(tipo) {
        return await this._getJsonData(`${this.url}?tipo=${tipo}`);
    }

    async find(id) {
        return await this._getJsonData(`${this.url}/${id}`);
    }

    async create(azienda) {
        return await this._postJsonData(this.url, azienda);
    }

    async update(azienda) {
        return await this._putJsonData(`${this.url}/${azienda.id}`, azienda);
    }

    async delete(id) {
        return await this._deleteJsonData(`${this.url}/${id}`);
    }
}