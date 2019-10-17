export default class Apparecchiatura {

    constructor({ taratura, manutenzione, gestioneTaratura, gestioneManutenzione }) {
        this.taratura = taratura;
        this.manutenzione = manutenzione;
        this.gestioneTaratura = gestioneManutenzione;
        this.gestioneTaratura = gestioneTaratura;
    }

    isValid(entity) {
        return true;
    }

    isTaraturaTemporale() {
        return this.taratura === true && this.gestioneTaratura && this.gestioneTaratura.tipo.denominazione === 'TEMPORALE';
    }

    isManutenzioneTemporale() {
        return this.manutenzione === true && this.gestioneManutenzione &&
            this.gestioneManutenzione.tipo.denominazione === 'TEMPORALE';
    }

    isGestita() {
        return this.taratura === true || this.manutenzione === true;
    }
}