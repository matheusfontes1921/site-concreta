import React, {useEffect, useState} from "react";
import '../assets/news.css';

import SideBar from "../components/SideBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import {criarNoticia, deletarNoticia, editarNoticia, getNoticias} from "../service/controller/noticia.js";
import {Box} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";

export default function News() {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [descricao, setDescricao] = useState("");
    const [noticias, setNoticias] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Id', width: 300 },
        { field: 'titulo', headerName: 'Título', width: 150 },
        { field: 'conteudo', headerName: 'Descrição', width: 200 },
        { field: 'url', headerName: 'Link para notícia', width: 200 },
        { field: 'editar', headerName: 'Editar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faPen} style={{cursor: 'pointer'}} onClick={() => editarNoticias(param.id)} /> },
        { field: 'deletar', headerName: 'Deletar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faTrash} style={{color: 'red', cursor: 'pointer'}} onClick={() => removerNoticias(param.id)} /> },

    ];

    useEffect(() => {
        if (noticias.length === 0) {
            getNoticias().then((res) => {
                setNoticias(res.data)
            })
        }

        console.log("noticias", noticias);
    }, [noticias])

    const cadastrarNoticias = () => {
        const data = {
            titulo: title,
            conteudo: descricao,
            url: link,
        }

        criarNoticia(data)
            .then((res) =>  setNoticias([...noticias, res]));
    }
    const editarNoticias = (id) => {
        const data = {
            id: id,
            titulo: title,
            conteudo: descricao,
            url: link,
        }

        noticias.map((n) => {
            if(id === n.id) {
                n.conteudo = descricao
                n.url = link
            }
        })

        editarNoticia(data)
            .then((res) => setNoticias(noticias))
    }
    const removerNoticias = (id) => {
        const newNoticias = [...noticias];

        newNoticias.map((n) => {
            if(n.id === id) {
                newNoticias.splice(newNoticias.indexOf(n), 1)
            }
        })


        deletarNoticia(id)
            .then((res) => setNoticias(newNoticias));
    }

    return(
        <>
            <SideBar></SideBar>

            <main className="main-content no-decoration">
                <h1 className="title">Gerenciamento de Notícias</h1>
                <div className="news-container">
                    <div className="content-container">
                        <div className="content-inputs">
                            <TextField
                                id="titulo"
                                label="Título"
                                variant="outlined"
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            <TextField
                                id="link-noticia"
                                label="Link para notícia"
                                variant="outlined"
                                onChange={(event) => setLink(event.target.value)} />
                            <TextField
                                id="descricao"
                                label="Descrição"
                                variant="outlined"
                                multiline
                                onChange={(event) => setDescricao(event.target.value)} />
                        </div>
                        <div className="content-actions">
                            <Button variant="contained" onClick={cadastrarNoticias} >CADASTRAR NOTÍCIA</Button>
                        </div>
                    </div>
                    <div className="list-container">
                        <h1 class="list-title">Listagem de Notícias</h1>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={noticias}
                                getRowId={(row) => row.id}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        </Box>
                    </div>
                </div>
            </main>
        </>
    )
}