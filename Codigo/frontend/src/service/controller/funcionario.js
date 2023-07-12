import {back} from "../api.js";

export const handleCadastrarFuncionario = (name, senha) => {
    const user = {nome: name, senha: senha};
    const headers = {'Content-Type': 'application/json'};

    return back.post("api/user/createFuncionario", JSON.stringify(user), {headers: headers})
        .then(res => res)
        .catch(err => err);
}
export const handleEditarFuncionario = (nome, senha, nomeAtual) => {
    const user = {nome: nome, senha: senha};
    const headers = {'Content-Type': 'application/json'};

    return back.put(`api/user/updateFuncionario/${nomeAtual}`, JSON.stringify(user), {headers: headers})
        .then(res => res)
}
export const handleDeletarFuncionario = (nome) => {
    const headers = {'Content-Type': 'application/json'};

    return back.delete(`api/user/deleteFuncionario/${nome}`, {headers: headers})
        .then(res => res)
        .catch(error => error.response)
}

export const getFuncionarios = () => {
    return back.get('api/user/findAll').then((response) => response)
}