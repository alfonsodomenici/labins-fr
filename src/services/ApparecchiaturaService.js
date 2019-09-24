import AbstractService from './AbstractService.js';

export default class ApparecchiaturaService extends AbstractService {

    constructor({ uri, idLab }) {
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

    async find(id) {
        const resp = await fetch(`${this.url}/${id}`, {
            method: 'GET',
            headers: this.headers
        });
        return await resp.json();
    }

    async create(apparecchiatura) {
        try {
            this.headers.set('Content-Type', 'application/json');
            const resp = await fetch(`${this.url}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(apparecchiatura)
            });
            if(!resp.ok){
                throw new Error('Network response was not ok.');
            }
            return await resp.text();
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }

    }

    async update(apparecchiatura) {
        try {
            console.log(JSON.stringify(apparecchiatura));
            this.headers.set('Content-Type', 'application/json');
            const resp = await fetch(`${this.url}/${apparecchiatura.id}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(apparecchiatura)
            });
            if(!resp.ok){
                throw new Error('Network response was not ok.');
            }
            return await resp.json();
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }

    }

    async delete(id) {
        try {
            this.headers.delete('Content-Type');
            console.log(`${this.url}/${id}`);
            const resp = await fetch(`${this.url}/${id}`, {
                method: 'DELETE',
                headers: this.headers
            });
            if(!resp.ok){
                throw new Error('Network response was not ok.');
            }
            return resp;
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }

    }
}