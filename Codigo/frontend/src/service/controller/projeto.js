import {back} from "../api.js";

export const getProjeto = () => {
    return back.get("api/projeto/findAll").then((response) => response)
}

export const handleCreateProject = (titulo, descricao) => {
    const projeto = {titulo: titulo, descricao: descricao};
    const headers = {'Content-Type': 'application/json'};

    return back.post("api/projeto/create", JSON.stringify(projeto), {headers: headers})
        .then(res => res)
        .catch(err => err);
}
export const handleEditarProject = (titulo, descricao, id) => {
    const projeto = {id: id, titulo: titulo, descricao: descricao};
    const headers = {'Content-Type': 'application/json'};

    return back.put("api/projeto/atualizar", JSON.stringify(projeto), {headers: headers})
        .then(res => res)
        .catch(err => err);
}
export const handleDeleteProject = (id) => {
    const headers = {'Content-Type': 'application/json'};

    return back.delete(`api/projeto/delete/${id}`, {headers: headers})
        .then(res => res)
        .catch(err => err);
}