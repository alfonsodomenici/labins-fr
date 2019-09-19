export default class AbstractService{

    constructor(){
        this.url = 'http://localhost:8080/labins/api';
        this.headers = new Headers({
            'Authorization': 'Bearer ' + 'keycloak.token'
          });
    }
}