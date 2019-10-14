export default class RestService{

    constructor(){
        this.base = 'http://localhost:8080/labins/api'; 
        this.url = this.base;
        this.headers = new Headers({
            'Authorization': 'Bearer ' + 'keycloak.token'
          });
    }
}