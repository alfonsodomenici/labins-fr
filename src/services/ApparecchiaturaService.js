import AbstractService from './AbstractService.js';

export default class ApparecchiaturaService extends AbstractService{

    constructor({uri,idLab}){
        super();
        this.url += `${uri}/apparecchiature`;
        this.idLab = idLab;
    }

    async search({ idDom, idTipo, idAz, idDistr, idMan, idTar, start, pageSize }) {
        const resp = await fetch(`${this.url}?idDom=${idDom}&idTipo=${idTipo}&idAz=${idAz}&idDistr=${idDistr}&idMan=${idMan}&idTar=${idTar}&start=${start}&page=${pageSize}`, {
            method: 'GET',
            headers: this.headers
        });
        return await resp.json();
    }
}