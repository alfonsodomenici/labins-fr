import RestService from './RestService.js';

export default class AbilitazioneService extends RestService {

    constructor() {
        super();
        this.url += '/abilitazioni';
    }

    async search(usr) {
        return await this._getJsonData(`${this.url}?usr=${usr}`);
    }

    async find(id) {
        return await this._getJsonData(`${this.url}/${id}`);
    }

    async create(abilitazione) {
        return await this._postJsonData(this.url, abilitazione);
    }

    async update(abilitazione) {
        return await this._putJsonData(`${this.url}/${abilitazione.id}`, abilitazione);
    }

    async delete(id) {
        return await this._deleteJsonData(`${this.url}/${id}`);
    }
}