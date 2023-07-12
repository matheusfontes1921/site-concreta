import {back} from "../api.js";

export const handleCadastrarSubServico = (name, descricao, servicoName, imagem) => {
    const subServico = {nome: name, imagemString: imagem, descricao: descricao, servicoId: servicoName};
    const headers = {'Content-Type': 'application/json'};

    return back.post("api/subservicos/create", JSON.stringify(subServico), {headers: headers})
        .then(res => res.data)
}
export const handleEditarSubServico = (name, descricao, servicoId, imagem, id) => {
    const subServico = {nome: name, imagemString: imagem, descricao: descricao, servicoId: servicoId};
    const headers = {'Content-Type': 'application/json'};

    return back.put(`api/subservicos/update/${id}`, JSON.stringify(subServico), {headers: headers})
        .then(res => res)
}
export const handleDeletarSubServico = (id) => {
    const headers = {'Content-Type': 'application/json'};

    return back.delete(`api/subservicos/delete/${id}`, {headers: headers})
        .then(res => res)
        .catch(error => error.response)
}

export const getSubServicos = () => {
    return back.get('api/subservicos/findAll')
        .then((response) => response)
        .catch(error => error.response)
}