import React, {useEffect, useState} from "react";
import SideBar from "../components/SideBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import '../assets/services.css'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

import {
    getServicos,
    handleCadastrarServico,
    handleDeletarServico,
    handleEditarServico
} from "../service/controller/servico.js";
import {Box, MenuItem} from "@mui/material";
import {
    getSubServicos,
    handleCadastrarSubServico,
    handleDeletarSubServico,
    handleEditarSubServico
} from "../service/controller/subservico.js";
import {b64Imgs, clearArray, clickImg, getBase64} from "../service/controller/b64.js";

export default function Services() {
    const [servico, setServico] = useState({});
    const [subServico, setSubServico] = useState({})
    let [servicos, setServicos] = useState([]);
    const [subServicos, setSubServicos] = useState([]);

    useEffect(() => {
        if(servicos.length === 0) {
            getServicos().then((res) => {
                setServicos(res.data)
            })
        }

        if(subServicos.length === 0) {
            getSubServicos().then((res) => {
                console.log("sub", res.data)
                setSubServicos(res.data)
            })
        }

    }, [servicos, subServicos])

    const serviceColumns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'nome', headerName: 'Nome do Serviço', width: 100 },
        { field: 'imagem', headerName: 'Imagem', width: 200, renderCell: (param) => <img alt={"imagem"} style={{width: '50px', height: '50px', cursor: 'pointer'}} src={param.row.imagem.url} onClick={clickImg} /> },
        { field: 'editar', headerName: 'Editar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faPen} style={{cursor: 'pointer'}} onClick={() => editarServico(param.id)} /> },
        { field: 'deletar', headerName: 'Deletar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faTrash} style={{color: 'red', cursor: 'pointer'}} onClick={() => removerServico(param.id)} /> },
    ];

    const subServiceColumns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'nome', headerName: 'Nome', width: 100 },
        { field: 'descricao', headerName: 'Descrição', width: 100 },
        { field: 'imagemString', headerName: 'Imagem', width: 200, renderCell: (param) => <img alt={"imagem"} style={{width: '50px', height: '50px', cursor: 'pointer'}} src={param.row.imagemString} onClick={clickImg} /> },
        { field: 'servico', headerName: 'Servico', width: 100 },
        { field: 'editar', headerName: 'Editar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faPen} style={{cursor: 'pointer'}} onClick={() => editarSubServico(param.id)} /> },
        { field: 'deletar', headerName: 'Deletar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faTrash} style={{color: 'red', cursor: 'pointer'}} onClick={() => removerSubServico(param.id)} /> },
    ];

    const cadastrarServico = async () => {
        if (!servico.name || !servico.imagemURL)
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

        handleCadastrarServico(servico.name, b64)
            .then((res) => {
                if(res.status === 200) {
                    console.log(res.data)
                    setServicos([...servicos, res.data])
                    clearArray();
                } else {
                    return Swal.fire({
                        toast: true,
                        icon: 'error',
                        text: res.response.data,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true
                    })
                }
            })
    }
    const editarServico = (id) => {
        if (! servico.name || !servico.imagemURL)
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

        const newServicos = [...servicos];

        console.log(newServicos)

        newServicos.map((s) => {
            if(s.id === id) {
                console.log(s)
                console.log(b64)
                s.nome = servico.name;
                s.imagem.url = b64
            }
        })

        console.log("depois", newServicos)

        handleEditarServico(servico.name, b64, id)
            .then((res) => {
                if(res.status === 200) {
                    console.log(newServicos)
                    setServicos(newServicos)
                    clearArray();
                }
            })

    }

    const removerServico = (id) => {

        const newServicos = [...servicos];

        newServicos.map((s) => {
            if(s.id === id) {
                newServicos.splice(newServicos.indexOf(s), 1)
            }
        })

        handleDeletarServico(id)
            .then(() => {
                setServicos(newServicos)
            })
    }

    const cadastrarSubServico = async () => {
        console.log(subServico)
        if (!subServico.name || !subServico.descricao || !subServico.servicoId || !subServico.imagemURL)
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

        handleCadastrarSubServico(subServico.name, subServico.descricao, subServico.servicoId, b64)
            .then((res) => setSubServicos([...subServicos, res]))
    }
    const editarSubServico = (id) => {
        if (!subServico.name || !subServico.descricao || !subServico.servicoId || !subServico.imagemURL)
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

        const newSubServicos = [...subServicos];

        newSubServicos.map((s) => {
            if(s.id === id) {
                s.nome = subServico.name
                s.descricao = subServico.descricao
                s.imagemString = b64
                s.servicoId = subServico.servicoId
            }
        })

        handleEditarSubServico(subServico.name, subServico.descricao, subServico.servicoId, b64, id)
            .then(() => {
                setSubServicos(newSubServicos)
            })

    }

    const removerSubServico = (id) => {
        const newSubServicos = [...subServicos];

        newSubServicos.map((s) => {
            if(s.id === id) {
                newSubServicos.splice(newSubServicos.indexOf(s), 1)
            }
        })

        const res = handleDeletarSubServico(id)
            .then(() => setSubServicos(newSubServicos))

        console.log(res)
    }

    return (
        <>
            <SideBar></SideBar>    

            <main className="main-content no-decoration">
                <h1 className="title">Gerenciamento de Serviços</h1>

                <div className="services-container">
                    <section className="service-container">
                        <h2 className="list-title">Serviços</h2>
                        <section className="first-part-content">
                            <div className="service-inputs">
                                <TextField id="nome" label="Nome" variant="outlined" onChange={(event) => setServico({
                                    ...servico,
                                    name: event.target.value
                                })}/>
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

                                               setServico({...servico, imagemURL: images[0]})
                                           }}
                                />
                            </div>
                            <div className="service-actions">
                                <Button variant="contained" onClick={cadastrarServico}>CADASTRAR SERVIÇO</Button>
                            </div>
                        </section>
                        <div className="list-container">
                            <h2 className="list-title">Listagem de Serviços</h2>
                            <Box sx={{ height: 400, width: '100%' }} >
                                <DataGrid
                                    rows={servicos}
                                    getRowId={(row) => row.id}
                                    columns={serviceColumns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </Box>

                        </div>
                    </section>

                    <section className="subservice-container">
                    <h2 className="list-title">Sub Serviços</h2>
                        <section className="first-part-content">
                            <div className="service-inputs">
                                <TextField
                                    id="subservice-nome"
                                    label="Nome"
                                    variant="outlined"
                                    onChange={(event) => setSubServico({
                                        ...subServico,
                                        name: event.target.value
                                    })}
                                />

                                <FormControl fullWidth>
                                    <InputLabel id="service-label">Serviço</InputLabel>
                                    <Select
                                        labelId="service-label"
                                        id="service-select"
                                        label="Serviço"
                                        onChange={(event) =>
                                            setSubServico({...subServico, servicoId: event.target.value})
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {servicos.map((servico) => {
                                                return <MenuItem key={servico.id} value={servico.id}>{servico.nome}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="subservice-descricao"
                                    label="Descricao"
                                    variant="outlined"
                                    multiline
                                    onChange={(event) => setSubServico({
                                        ...subServico,
                                        descricao: event.target.value
                                    })}
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

                                               setSubServico({...subServico, imagemURL: images[0]})
                                           }}
                                />
                            </div>
                            <div className="service-actions">
                                <Button variant="contained" onClick={cadastrarSubServico}>CADASTRAR SUB SERVIÇO</Button>
                            </div>
                        </section>
                        <div className="list-container">
                            <h2 className="list-title">Listagem de Sub Serviços</h2>
                            <Box sx={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={subServicos}
                                    getRowId={(row) => row.id}
                                    columns={subServiceColumns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </Box>
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}