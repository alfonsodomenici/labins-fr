import ApAppBar from './ApAppBar.js';
import ApNav from './ApNav.js';
import ApBreadcrumb from './ApBreadcrumb.js';
import ApRoute from './ApRoute.js';
import ApGrowl from './ApGrowl.js';
import ApAjaxStatus from './ApAjaxStatus.js';
import ApMenu from "./models/ApMenu.js";
import AbilitazioneService from "./services/AbilitazioneService.js";

export var keycloak = Keycloak('./keycloak.json');

keycloak.init({ 
    onLoad: 'login-required',
    promiseType: 'native',
    })
    .then(success => {
        console.log('login effettuata con successo');
        console.log(success);
        console.log('token parsed: ' + JSON.stringify(keycloak.tokenParsed));
        console.log('----------------------------');
        console.log(JSON.stringify(keycloak.token));
        const srv = new AbilitazioneService();
        return srv.search(keycloak.tokenParsed.upn);
    })
    .then(json => {
        sessionStorage.setItem("prm",JSON.stringify(json));
    })
    .catch(error => {
        console.log('errore nella login');
        console.log(error);
    });



const menuLink = document.querySelector('#menuLink');
const nav = document.querySelector('nav');
const main = document.querySelector('main');
const mediaQueryList = window.matchMedia("screen and (min-width: 40em)");
menuLink.addEventListener('click', e => {
    e.preventDefault();
    if (mediaQueryList.matches) {
        nav.classList.remove('nav-untoggle');
        main.classList.remove('main-untoggle');
        nav.classList.toggle('nav-toggle');
        main.classList.toggle('main-toggle');
    } else {
        nav.classList.remove('nav-toggle');
        main.classList.remove('main-toggle');
        nav.classList.toggle('nav-untoggle');
        main.classList.toggle('main-untoggle');
    }
});

customElements.whenDefined('ap-nav')
    .then(_ => {
        const apNav = document.querySelector('ap-nav');
        apNav.menu = ApMenu.menu();
    });

customElements.whenDefined('ap-appbar')
    .then(_ => {
        const apAppBar = document.querySelector('ap-appbar');
        apAppBar.appBar = ApMenu.appBar();
    })
