import RestService from './RestService.js';

export default class AziendaService extends RestService {

    constructor() {
        super();
        this.url += '/aziende';
    }

    async all() {
        const resp = await fetch(this.url, {
            method: 'GET',
            headers: this.headers
        });
        return await resp.json();
    }

    async searchByTipo(tipo) {
        const resp = await fetch(`${this.url}?tipo=${tipo}`, {
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

    async create(azienda) {
        try {
            this.headers.set('Content-Type', 'application/json');
            const resp = await fetch(`${this.url}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(azienda)
            });
            if (!resp.ok) {
                throw new Error('Network response was not ok.');
            }
            return await resp.text();
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }

    }

    async update(azienda) {
        try {
            console.log(JSON.stringify(azienda));
            this.headers.set('Content-Type', 'application/json');
            const resp = await fetch(`${this.url}/${azienda.id}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(azienda)
            });
            if (!resp.ok) {
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
            if (!resp.ok) {
                throw new Error('Network response was not ok.');
            }
            return resp;
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }

    }
}