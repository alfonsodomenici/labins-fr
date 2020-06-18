import { keycloak } from "./app.js";

const isTokenValid = () => {
    const { exp } = keycloak.tokenParsed;
    const now = Date.now();
    return exp * 1000 - now > 0;
}

export {isTokenValid};