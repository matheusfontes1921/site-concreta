import React, {useEffect, useState} from "react";
import '../assets/avaliacoes.css';

import SideBar from "../components/SideBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Box, MenuItem } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {getProjeto} from "../service/controller/projeto.js";
import {
    getAvaliacao,
    handleCreateAvaliacao,
    handleDeleteAvaliacao,
    handleEditarAvaliacao
} from "../service/controller/avalicao.js";
import Swal from "sweetalert2";
import {b64Imgs, clearArray, clickImg, getBase64} from "../service/controller/b64.js";

export default function Avaliacao() {
    const [avaliacao, setAvaliacao] = useState({})
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [projetos, setProjetos] = useState([])

    const columns = [
        { field: 'id', headerName: 'Id', width: 300 },
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'imagem', headerName: 'Imagem', width: 200, renderCell: (param) => <img alt={"imagem"} style={{width: '50px', height: '50px', cursor: 'pointer'}} src={param.row.imagem.url} onClick={clickImg} /> },
        { field: 'projeto', headerName: 'Projeto', width: 200, renderCell: (param) => param.row.projeto.titulo },
        { field: 'subtitulo', headerName: 'Subtítulo', width: 200 },
        { field: 'descricao', headerName: 'Descrição', width: 200 },
        { field: 'editar', headerName: 'Editar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faPen} style={{cursor: 'pointer'}} onClick={() => editarAvalicao(param.id)} /> },
        { field: 'deletar', headerName: 'Deletar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faTrash} style={{color: 'red', cursor: 'pointer'}} onClick={() => deleteAvalicao (param.id)} /> },
    ];

    useEffect(() => {
        if(avaliacoes.length === 0) {
            getAvaliacao().then((res) => {
                console.log(res.data.body);
                setAvaliacoes(res.data.body)
            })

        }

        if(projetos.length === 0) {
            getProjeto().then((res) => {
                setProjetos(res.data)
            })
        }
    }, [avaliacoes]);


    const createAvalicao = () => {
        if (!avaliacao.nome || !avaliacao.imagemURL || !avaliacao.projetoId || !avaliacao.subtitulo || !avaliacao.descricao)
            return Swal.fire({
                toast: true,
                icon: 'warning',
                text: 'Preencha todos os campos para prosseguir.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })

        const b64 = b64Imgs[0];

        handleCreateAvaliacao(avaliacao.nome, b64, avaliacao.projetoId, avaliacao.subtitulo, avaliacao.descricao)
            .then(res => {
                console.log(res)
                setAvaliacoes([...avaliacoes, res.data])
                clearArray();
            })
    }
    const editarAvalicao = (id) => {
        if (!avaliacao.nome || !avaliacao.imagemURL || !avaliacao.projetoId || !avaliacao.subtitulo || !avaliacao.descricao)
            return Swal.fire({
                toast: true,
                icon: 'warning',
                text: 'Preencha todos os campos para prosseguir.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })

        const b64 = b64Imgs[0];

        const newAvaliacoes = [...avaliacoes];

        console.log("antes", newAvaliacoes)

        const img = avaliacao.imagemURL[0]
        console.log("img", img)

        newAvaliacoes.map((a) => {
            if(a.id === id) {
                a.nome = avaliacao.nome
                a.imagem.url = b64
                a.projetoId = avaliacao.projetoId
                a.subtitulo = avaliacao.subtitulo
                a.descricao = avaliacao.descricao
            }
        })

        console.log(newAvaliacoes)

        handleEditarAvaliacao(id, avaliacao.nome, b64, avaliacao.projetoId, avaliacao.subtitulo, avaliacao.descricao)
            .then((res) => {
                console.log(res)
                setAvaliacoes(newAvaliacoes)
                clearArray();
            })
    }
    const deleteAvalicao = (id) => {

        const newAvaliacoes = [...avaliacoes];

        newAvaliacoes.map((a) => {
            if(a.id === id) {
                newAvaliacoes.splice(newAvaliacoes.indexOf(a), 1)
            }
        })

        handleDeleteAvaliacao(id)
            .then(() => {
                setAvaliacoes(newAvaliacoes)
            })
    }



    return(
        <>
            <SideBar></SideBar>

            <main className="main-content no-decoration">
                <h1 className="title">Gerenciamento de Avaliações</h1>
                <div className="news-container">
                    <div className="content-container">
                        <div className="content-inputs">
                            <TextField
                                id="nome"
                                label="Nome"
                                variant="outlined"
                                onChange={(e) => setAvaliacao({...avaliacao, nome: e.target.value})}
                            />
                            <TextField className="photo-label"
                                       type="file"
                                       helperText="Insira uma imagem acima"
                                       id="foto"
                                       variant="outlined"
                                       inputProps={{accept: 'image/*'}}
                                       onChange={(e) => {
                                           const images = [];

                                           for(const image of e.target.files) {
                                               images.push(image.name)
                                               getBase64(image);
                                           }

                                           setAvaliacao({...avaliacao, imagemURL: images})
                                       }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="service-label">Projeto</InputLabel>
                                <Select
                                    labelId="service-label"
                                    id="service-select"
                                    label="Serviço"
                                    onChange={(event) =>
                                        setAvaliacao({...avaliacao, projetoId: event.target.value})
                                    }
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {projetos.map((project) => {
                                        return <MenuItem key={project.id} value={project.id}>{project.titulo}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                            <TextField
                                id="subtitulo"
                                label="Subtítulo"
                                variant="outlined"
                                onChange={(e) => setAvaliacao({...avaliacao, subtitulo: e.target.value})}
                            />
                            <TextField
                                 id="descricao"
                                 label="Descrição"
                                 variant="outlined"
                                 onChange={(e) => setAvaliacao({...avaliacao, descricao: e.target.value})}
                            />
                        </div>
                        <div className="content-actions">
                            <Button variant="contained" onClick={createAvalicao}>CADASTRAR AVALIAÇÃO</Button>
                        </div>
                    </div>
                    <div className="list-container">
                        <h1 className="list-title">Listagem de Avaliações</h1>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={avaliacoes}
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