import ApNav from './ApNav.js';
import ApBreadcrumb from './ApBreadcrumb.js';
import ApRoute from './ApRoute.js';
import ApGrowl from './ApGrowl.js';
import ApAjaxStatus from './ApAjaxStatus.js';
import ApMenu from "./models/ApMenu.js";

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
        apNav.menu = ApMenu.menu;
    })
