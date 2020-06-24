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
        return this._roles().find(e => e === `rolab${id}`) !== undefined;
    }
}
