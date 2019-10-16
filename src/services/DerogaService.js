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

    async findVerificaIntermediaMancante() {
        return await this._getJsonData(`${this.url}?vi=true`);
    }

    async findLastFuoriServizio() {
        return await this._getJsonData(`${this.url}?fs=true&last=true`)
            .then(json => {
                console.log(json);  
                return json.size === 0 ? async _ => { } : this.find(json.fuoriServizi[0].id);
            });

    }

    async findDocumenti(id) {
        console.log('find documenti for deroga ' + id);
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
        console.log(id);
        console.log(docs);
        return await Promise.all(
            docs.map(async v => {
                return await v.todelete ? this.deleteDocumento(id, v.id) : this.uploadDocumento(id, v);
            })
        );
    }
}