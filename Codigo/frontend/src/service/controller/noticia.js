import {back} from "../api.js";

export const criarNoticia = (data) => {
    const headers = { 'Content-Type': 'application/json' };

    return back.post('api/noticias', JSON.stringify(data), { headers: headers })
        .then((response) => response.data)
}
export const editarNoticia = (data) => {
    const headers = {'Content-Type': 'application/json'};

    back.put(`api/noticias/atualizar`, JSON.stringify(data), {headers: headers}).then((response) => console.log(response))
}
export const deletarNoticia = (id) => {
    const headers = {'Content-Type': 'application/json'};

    return back.delete(`api/noticias/${id}`, {headers: headers}).then((response) => response)
}

export const getNoticias = () => {
    return back.get("api/noticias").then((response) => response)
}