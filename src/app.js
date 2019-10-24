import ApNav from './ApNav.js';
import ApBreadcrumb from './ApBreadcrumb.js';
import ApRoute from './ApRoute.js';
import ApGrowl from './ApGrowl.js';
import ApAjaxStatus from './ApAjaxStatus.js';
import ApNavVertical from './ApNavVertical.js';


const menuLink = document.querySelector('#menuLink');
const nav = document.querySelector('nav');
const main = document.querySelector('main');
const mediaQueryList = window.matchMedia("screen and (min-width: 40em)");
menuLink.addEventListener('click', e => {
    e.preventDefault();
    if (mediaQueryList.matches) {
        if (main.classList.contains('main-untoggle')) {
            nav.classList.toggle('nav-untoggle');
            main.classList.toggle('main-untoggle');
        }
        nav.classList.toggle('nav-toggle');
        main.classList.toggle('main-toggle');
    } else {
        if (main.classList.contains('main-toggle')) {
            nav.classList.toggle('nav-toggle');
            main.classList.toggle('main-toggle');
        }
        nav.classList.toggle('nav-untoggle');
        main.classList.toggle('main-untoggle');
    }

});
