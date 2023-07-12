import React, {useEffect, useState} from "react";
import '../assets/glandingpage.css';

import SideBar from "../components/SideBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import {Box} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {b64Imgs, clearArray, clickImg, getBase64} from "../service/controller/b64.js";
import {getCP, handleCreate, handleEditar, handleRemover} from "../service/controller/landingPage.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

export default function Avaliacao() {
    const [nome, setNome] = useState("");
    const [img, setImg] = useState("");
    const [tipo, setTipo] = useState("");
    const [cps, setCps] = useState([]);

    useEffect(() => {

        if (cps.length === 0) {
            getCP().then((res) => setCps(res))
        }

        console.log(cps)
    }, [cps]);


    const columns = [
        { field: 'id', headerName: 'Id', width: 300 },
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'imagem', headerName: 'Imagem', width: 200, renderCell: (param) => <img alt={"imagem"} style={{width: '50px', height: '50px', cursor: 'pointer'}} src={param.row.imagem.url} onClick={clickImg} /> },
        { field: 'tipo', headerName: 'Tipo', width: 200 },
        { field: 'editar', headerName: 'Editar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faPen} style={{cursor: 'pointer'}} onClick={() => editar(param.id, param.row.tipo)} /> },
        { field: 'deletar', headerName: 'Deletar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faTrash} style={{color: 'red', cursor: 'pointer'}} onClick={() => remover(param.id, param.row.tipo)} /> },
    ];

    const create = () => {
        if (!nome || !img || !tipo)
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

        handleCreate(nome, b64, tipo)
            .then((res) => {
                setCps([...cps, res.data])
                clearArray();

            })

    }
    const editar = (id, tipo) => {
        if (!nome || !img)
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

        const newCps = [...cps];


        newCps.map((c) => {
            if(c.id === id) {
                c.nome = nome;
                c.imagem.url = b64
            }
        })

        handleEditar(id, nome, b64, tipo)
            .then((res) => {
                console.log("created", res.data)

                setCps(newCps)
                clearArray();

            })

    }

    const remover = (id, tipo) => {

        const b64 = b64Imgs[0];

        const newCps = [...cps];


        newCps.map((c) => {
            if(c.id === id) {
                newCps.splice(newCps.indexOf(c), 1)
            }
        })

        handleRemover(id, tipo)
            .then(() => {
                setCps(newCps)
                clearArray();

            })

    }

    return(
        <>
            <SideBar></SideBar>

            <main className="main-content no-decoration">
                <h1 className="title">Gerenciamento de Landing Page</h1>
                <div className="news-container">
                    <div className="content-container">
                        <div className="content-inputs">
                            <TextField
                                id="nome"
                                label="Nome"
                                variant="outlined"
                                onChange={(e) => setNome(e.target.value)}
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

                                     setImg(images[0])
                                 }}
                             />
                            <div>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      label="Tipo"
                                      onChange={(e) => setTipo(e.target.value)}
                                    >
                                      <MenuItem value={1}>Cliente</MenuItem>
                                      <MenuItem value={2}>Parceiro</MenuItem>
                                    </Select>

                                </FormControl>
                            </div>
                        </div>
                    <div className="content-actions">
                        <Button variant="contained" onClick={create}>CADASTRAR </Button>
                    </div>
                </div>
                <div className="list-container">
                    <h1 className="list-title">Listagem de Clientes e Parceiros</h1>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={cps}
                            getRowId={(row) => row.id}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
                </div>

                </div>
                <div className="extra-container">
                    <div className="extra-content">
                        <div className="extra-inputs">
                            <h1><b>Informações extras</b></h1>
                            <TextField
                                id="telefone"
                                label="Telefone para contato"
                                variant="outlined"

                            />
                            <TextField
                               id="email"
                               label="Email para contato"
                                variant="outlined"
                             />
                        </div>
                        <div className="extra-actions">
                            <Button variant="contained" >SALVAR ALTERAÇÕES </Button>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}