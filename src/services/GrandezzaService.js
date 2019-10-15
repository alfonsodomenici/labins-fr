import RestService from './RestService.js';

export default class GrandezzaService extends RestService{

    constructor(){
        super();
        this.url += '/grandezze';
    }

    async all() {
        return await this._getJsonData(this.url);
    }
}