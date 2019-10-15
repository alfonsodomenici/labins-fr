import RestService from './RestService.js';

export default class ApparecchiaturaService extends RestService {

    constructor({ uri }) {
        super();
        this.url += `${uri}/apparecchiature`;
    }

    async search({ idDom, idTipo, idAz, idDistr, idMan, idTar, start, pageSize }) {
        return await this._getJsonData(`${this.url}?idDom=${idDom}&idTipo=${idTipo}&idAz=${idAz}&idDistr=${idDistr}&idMan=${idMan}&idTar=${idTar}&start=${start}&page=${pageSize}`);
    }

    async findDiRiferimento() {
        return await this._getJsonData(`${this.url}/riferimento`);
    }

    async find(id) {
        return await this._getJsonData(`${this.url}/${id}`);
    }

    async create(apparecchiatura) {
        return await this._postJsonData(`${this.url}`, apparecchiatura);
    }

    async update(apparecchiatura) {
        return await this._putJsonData(`${this.url}/${apparecchiatura.id}`, apparecchiatura);
    }

    async delete(id) {
        return await this._deleteJsonData(`${this.url}/${id}`);
    }

    async findDocumenti(id) {
        console.log('find documenti for apparecchiatura ' + id);
        return await this._getJsonData(`${this.url}/${id}/documenti`);
    }

    async downloadDocumento(id, idDocumento) {
        return await this._getBlobData(`${this.url}/${id}/documenti/${idDocumento}/download`);
    }

    async uploadDocumento(id, { tipo, mediaType, denominazione, file, fileData, }) {
        const formData = new FormData();
        formData.append('tipo', tipo.id);
        formData.append('mediaType', mediaType);
        formData.append('denominazione', denominazione);
        formData.append('fileName', file);
        formData.append('uploadedFile', fileData);
        return await this._postFormData(`${this.url}/${id}/documenti/`, formData);
    }

    async deleteDocumento(id, idDocumento) {
        return await this._deleteJsonData(`${this.url}/${id}/documenti/${idDocumento}`);
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

    async createFuoriServizio(id, fuoriServizio) {
        return await this._postJsonData(`${this.url}/${id}/fuori-servizi/`, fuoriServizio);
    }

    /*
    async updloadDocumenti1(id, docs) {
        return docs.reduce(async (promise, doc) => {
            // This line will wait for the last async function to finish.
            // The first iteration uses an already resolved Promise
            // so, it will immediately continue.
            await promise;
            const msg = await this.uploadDocumento(id, doc);
            console.log(msg);
        }, Promise.resolve());
    }

    async deleteDocumenti1(id, docs) {
        docs.reduce(async (promise, doc) => {
            // This line will wait for the last async function to finish.
            // The first iteration uses an already resolved Promise
            // so, it will immediately continue.
            await promise;
            const msg = await this.deleteDocumento(id, doc.id);
            console.log(msg);
        }, Promise.resolve());
    }
    */
}