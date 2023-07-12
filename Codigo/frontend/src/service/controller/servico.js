import {back} from "../api.js";

export const handleCadastrarServico = (name, imagem) => {
    const servico = {nome: name, imagemString: imagem};
    const headers = {'Content-Type': 'application/json'};

    return back.post("api/servicos/create", JSON.stringify(servico), {headers: headers})
        .then(res => res)
        .catch(err => err);
}
export const handleEditarServico = (nome, imagem, id) => {
    const servico = {nome: nome, imagemString: imagem};
    const headers = {'Content-Type': 'application/json'};

    return back.put(`api/servicos/update/${id}`, JSON.stringify(servico), {headers: headers})
        .then(res => res)
}
export const handleDeletarServico = (id) => {
    const headers = {'Content-Type': 'application/json'};

    return back.delete(`api/servicos/delete/${id}`, {headers: headers})
        .then(res => res)
}

export const getServicos = () => {
    return back.get('api/servicos/findAll').then((response) => response)
}