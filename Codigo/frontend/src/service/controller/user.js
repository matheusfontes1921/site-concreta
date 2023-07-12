import { back } from "../api.js";

export const requestLogin = (email, password) => {
    const user = {nome: email, senha: password};
    const headers = {'Content-Type': 'application/json'};

    return back.post('api/user/login', JSON.stringify(user), {headers: headers})
        .then(res => res)
        .catch(error => error.response)
}
export const requestLoginAdmin = (email, password) => {
    const user = {name: email, password: password};
    const headers = {'Content-Type': 'application/json'};

    if(email === 'admin') {
        return back.post('api/user/loginAdmin', JSON.stringify(user), {headers: headers})
            .then(res => res)
            .catch(error => error.response)
    } else {
        return back.post('api/user/loginFuncionario', JSON.stringify(user), {headers: headers})
            .then(res => res)
            .catch(error => error.response)
    }
}

export const isLogged = () => {
    return window.localStorage.getItem('admin');
}