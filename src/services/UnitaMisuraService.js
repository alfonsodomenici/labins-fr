import RestService from './RestService.js';

export default class UnitaMisuraService extends RestService{

    constructor(){
        super();
        this.url += '/unita-misura';
    }

    async all() {
        return await this._getJsonData(this.url);
    }
}