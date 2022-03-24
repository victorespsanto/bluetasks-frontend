import axios from "axios";
import { AUTH_ENDPOINT, JWT_TOKEN_NAME } from "../constants";

class AuthService {
    login(username, password, onLogin){
        axios
            .post(`${AUTH_ENDPOINT}/login`, { userName: username, password: password })
            .then(response => {
                const jwtToken = response.headers['authorization'].replace("Bearer ", "");
                sessionStorage.setItem(JWT_TOKEN_NAME, jwtToken);
                onLogin(true);
            }).catch(error => {
                console.error(error);
                onLogin(false);
            });
    }

}

export default new AuthService();