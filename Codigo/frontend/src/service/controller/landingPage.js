import {back} from "../api.js";

export const handleCreate = (nome, imagemString, tipo) => {
    const cp = {nome: nome, imagemString};
    const headers = {'Content-Type': 'application/json'};

    if(tipo === 1) {
        return back.post("api/cliente/create", JSON.stringify(cp), {headers: headers})
            .then(res => res)
            .catch(err => err);
    } else if(tipo === 2) {
        return back.post("api/parceiro/create", JSON.stringify(cp), {headers: headers})
            .then(res => res)
            .catch(err => err);
    }
}
export const handleEditar = (id, nome, imagemString, tipo) => {
    const cp = {id: id, nome: nome, imagemString};
    const headers = {'Content-Type': 'application/json'};


    if(tipo === "Cliente") {

        return back.put("api/cliente/update", JSON.stringify(cp), {headers: headers})
            .then(res => res)
            .catch(err => err);
    } else if(tipo === "Parceiro") {
        return back.put("api/parceiro/update", JSON.stringify(cp), {headers: headers})
            .then(res => res)
            .catch(err => err);
    }
}
export const handleRemover = (id, tipo) => {
    const headers = {'Content-Type': 'application/json'};

    if(tipo === "Cliente") {
        return back.delete(`api/cliente/delete/${id}`, {headers: headers})
            .then(res => res)
            .catch(err => err);
    } else if(tipo === "Parceiro") {
        return back.delete(`api/parceiro/delete/${id}`, {headers: headers})
            .then(res => res)
            .catch(err => err);
    }
}

export const getCP = async () => {
    const clientes = await back.get("api/cliente/findall")

    clientes.data.map(cliente => {
        cliente.tipo = "Cliente";
    })

    const parceiros = await back.get("api/parceiro/findall")

    parceiros.data.map(parceiro => {
        parceiro.tipo = "Parceiro"
    })

    return [...clientes.data, ...parceiros.data]
}