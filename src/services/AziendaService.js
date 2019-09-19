import AbstractService from './AbstractService.js';

export default class AziendaService extends AbstractService{

    constructor(){
        super();
        this.url += '/aziende';
    }

    async searchByTipo(tipo) {
        const resp = await fetch(`${this.url}?tipo=${tipo}`, {
            method: 'GET',
            headers: this.headers
        });
        return await resp.json();
    }
}