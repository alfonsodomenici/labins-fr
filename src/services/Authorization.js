import { keycloak } from './../app.js';

export default class Authz {

    static _roles() {
        const { roles } = keycloak.tokenParsed.resource_access.labins;
        return roles;
    }

    static isAdmin(){
        return this._roles().find(e => e === `admins`) !== undefined;
    }

    static isUser(){
        return this._roles().find(e => e === `users`) !== undefined;
    }

    static isROLab(id) {
        const labPermission = JSON.parse(sessionStorage.getItem("prm"));
        return labPermission.find(e => e.laboratorio.id === id && e.livello === "LETTURA") !== undefined;
    }
}
