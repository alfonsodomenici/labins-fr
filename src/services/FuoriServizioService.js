import AbstractService from './AbstractService.js';

export default class FuoriServizioService extends AbstractService {

    constructor({ uri }) {
        super();
        this.url += `${uri}/fuori-servizi`;
    }

    async search({ start, pageSize }) {
        const resp = await fetch(`${this.url}?start=${start}&page=${pageSize}`, {
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

    async create(fuoriServizio) {
        try {
            this.headers.set('Content-Type', 'application/json');
            const resp = await fetch(`${this.url}`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(fuoriServizio)
            });
            if (!resp.ok) {
                throw new Error('Network response was not ok.');
            }
            return await resp.json();
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }
    }

    async update(fuoriServizio) {
        try {
            this.headers.set('Content-Type', 'application/json');
            const resp = await fetch(`${this.url}/${fuoriServizio.id}`, {
                method: 'PUT',
                headers: this.headers,
                body: JSON.stringify(fuoriServizio)
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

    async findDocumenti(id) {
        console.log('find documenti for apparecchiatura ' + id);
        const resp = await fetch(`${this.url}/${id}/documenti`, {
            method: 'GET',
            headers: this.headers
        });
        return await resp.json();
    }

    async downloadDocumento(id, idDocumento) {
        const resp = await fetch(`${this.url}/${id}/documenti/${idDocumento}/download`, {
            method: 'GET',
            headers: this.headers
        });
        return await resp.blob();
    }

    async uploadDocumento(id, { tipo, mediaType, denominazione, file, fileData, }) {
        try {
            this.headers.delete('Content-Type');
            const formData = new FormData();
            formData.append('tipo', tipo.id);
            formData.append('mediaType', mediaType);
            formData.append('denominazione', denominazione);
            formData.append('fileName', file);
            formData.append('uploadedFile', fileData);
            const resp = await fetch(`${this.url}/${id}/documenti/`, {
                method: 'POST',
                headers: this.headers,
                body: formData
            });
            if (!resp.ok) {
                throw new Error('Network response was not ok.');
            }
            return await resp.json();
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }
    }

    async deleteDocumento(id, idDocumento) {
        try {
            this.headers.delete('Content-Type');
            const resp = await fetch(`${this.url}/${id}/documenti/${idDocumento}`, {
                method: 'DELETE',
                headers: this.headers
            });
            if (!resp.ok) {
                throw new Error('Network response was not ok.');
            }
            return await resp.text();
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }
    }

    async updloadDocumenti(id, docs) {
        return await Promise.all(docs.map(async v => {
            return await this.uploadDocumento(id, v);
        }));
    }

    async deleteDocumenti(id, docs) {
        return await Promise.all(docs.map(async v => {
            return await this.deleteDocumento(id, v.id);
        }));
    }

    async updateDocumenti(id, toadd, todelete) {
        const docs = [...toadd, ...todelete];
        return await Promise.all(
            docs.map(async v => {
                return await v.todelete ? this.deleteDocumento(id, v.id) : this.uploadDocumento(id, v);
            })
        );
    }
}