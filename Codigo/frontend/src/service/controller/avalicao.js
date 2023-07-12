import {back} from "../api.js";

export const getAvaliacao = () => {
    return back.get('api/avaliacao/findAll').then(res => res);
}
export const handleCreateAvaliacao = (nome, imagemURL, projetoId, subtitulo, descricao) => {
    const avaliacao = {nome, imagemURL, projetoId, subtitulo, descricao}
    const headers = {'Content-Type': 'application/json'};

    return back.post('api/avaliacao/create', JSON.stringify(avaliacao), {headers: headers}).then(res => res);
}
export const handleEditarAvaliacao = (id, nome, imagemURL, projetoId, subtitulo, descricao) => {
    const avaliacao = {id, nome, imagemURL, projetoId, subtitulo, descricao}
    const headers = {'Content-Type': 'application/json'};

    return back.put('api/avaliacao/update', JSON.stringify(avaliacao), {headers: headers}).then(res => res);
}
export const handleDeleteAvaliacao = (id) => {
    const headers = {'Content-Type': 'application/json'};

    return back.delete(`api/avaliacao/delete/${id}`, {headers: headers}).then(res => res);
}