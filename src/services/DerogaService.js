import RestService from './RestService.js';

export default class DerogaService extends RestService {

    constructor({ uri }) {
        super();
        this.url += `${uri}/deroghe`;
        console.log(this.url);
    }

    async all() {
        return await this._getJsonData(this.url);
    }

    async find(id) {
        return await this._getJsonData(`${this.url}/${id}`);
    }

    async create(deroga) {
        return await this._postJsonData(this.url, deroga);
    }

    async update(deroga) {
        return await this._putJsonData(`${this.url}/${deroga.id}`,deroga);
    }

    async delete(id) {
        return await this._deleteJsonData(`${this.url}/${id}`);
    }
}