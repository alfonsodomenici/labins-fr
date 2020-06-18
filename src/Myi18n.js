export default class Myi18n {

    static getMessage(key) {
        return Reflect.get(Myi18n.messages(), key);
    }

    static messages() {
        return {
            "createSuccess": "Creazione effettuata con successo",
            "createFailed": "Creazione fallita",
            "updateSuccess": "Aggiornamento effettuato con successo",
            "updateFailed": "Aggiornamento fallito",
            "deleteSuccess": "Eliminazione effettuata con successo",
            "deleteFailed": "Eliminazione fallita",
        };
    }
}