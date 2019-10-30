export default class ApMenu {

    static menu() {
        return Array.of(
            {
                type: 'item',
                url: '#LaboratorioList',
                label: 'Laboratori',
                icon: '',
                params: {},
                external: false
            },
            {
                type: 'item',
                url: '#UtenteList',
                label: 'Utenti',
                icon: '',
                params: {},
                external: false
            },
            {
                type: 'item',
                url: '#AziendaList',
                label: 'Aziende',
                icon: '',
                params: {},
                external: false
            },
        );
    }

    static appBar() {
        return {
            title: 'Lab-Ins',
            menu: [

            ]
        };
    }
}