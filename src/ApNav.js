export default class ApNav extends HTMLElement {

    constructor() {
        super();
        this.activeLink = null;
    }


    connectedCallback() {
        let links = document.querySelectorAll('a');
        window.addEventListener('hashchange', e => this.onNavigation(e));
        links.forEach(link => this.registerListeners(link));
    }

    registerListeners(link) {
        link.addEventListener('click', ev => this.onLinkClicked(ev));
    }

    onLinkClicked(ev) {
        const {target}  = ev;
        if(this.activeLink){
            this.activeLink.classList.toggle('active-link');
        }
        this.activeLink = target;
        this.activeLink.classList.toggle('active-link');
    }

    onNavigation(e) {
        const {hash} = window.location;
        const event = new CustomEvent(
            'ap-navigation', {
                detail: {
                    link: hash.substring(1)
                },
                bubbles: true
            }
        );
        this.dispatchEvent(event);
        const linkEl = this.querySelector(`a[href="${hash}"]`);
        this.onLinkClicked({target: linkEl});
    }
}
customElements.define('ap-nav', ApNav);
