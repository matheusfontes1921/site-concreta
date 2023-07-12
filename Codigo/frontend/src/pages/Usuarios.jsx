import React, {useEffect, useState} from "react";
import '../assets/usuarios.css';

import SideBar from "../components/SideBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import {Box} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import {
    getFuncionarios,
    handleCadastrarFuncionario, handleDeletarFuncionario,
    handleEditarFuncionario
} from "../service/controller/funcionario.js";

const initialUser = {
    nome: "",
    senha: "",
}

export default function Usuarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionario, setFuncionario] = useState(initialUser)
    const [confirmSenha, setConfirmSenha] = useState("");

    useEffect(() => {
        if(funcionarios.length === 0) {
            getFuncionarios().then((res) => {
                console.log("t", res);
                setFuncionarios(res.data)
            })

            console.log("f", funcionarios);
        }

    }, [funcionarios])

    const columns = [
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'cargo', headerName: 'Cargo', width: 150 },
        { field: 'senha', headerName: 'Senha', width: 150 },
        { field: 'editar', headerName: 'Editar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faPen} style={{cursor: 'pointer'}} onClick={() => editarFuncionario(param.id)} /> },
        { field: 'deletar', headerName: 'Deletar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faTrash} style={{color: 'red', cursor: 'pointer'}} onClick={() => removerFuncionario(param.id)} /> },
    ];

    const cadastrarFuncionario = () => {
        if (!funcionario.nome || !funcionario.senha || !confirmSenha)
            return Swal.fire({
                toast: true,
                icon: 'warning',
                text: 'Preencha todos os campos para prosseguir.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })

        if(funcionario.senha !== confirmSenha)
            return Swal.fire({
                toast: true,
                icon: 'warning',
                text: 'Senhas diferentes.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })

        handleCadastrarFuncionario(funcionario.nome, funcionario.senha)
            .then((res) => {
                if(res.status === 200) {
                    console.log(res.data)
                    setFuncionarios([...funcionarios, res.data])
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

    const editarFuncionario = (nomeAtual) => {
        console.log(nomeAtual)

        if (!funcionario.nome || !funcionario.senha || !confirmSenha)
            return Swal.fire({
                toast: true,
                icon: 'warning',
                text: 'Preencha todos os campos para prosseguir.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })

        if(funcionario.senha !== confirmSenha)
            return Swal.fire({
                toast: true,
                icon: 'warning',
                text: 'Senhas diferentes.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })

        funcionarios.map((f) => {
            if(nomeAtual === f.nome) {
                f.nome = funcionario.nome
                f.senha = funcionario.senha
            }
        })

        handleEditarFuncionario(funcionario.nome, funcionario.senha, nomeAtual)
            .then((res) => {
                if(res.status === 200) {
                    setFuncionarios(funcionarios)
                }
            })
    }

    const removerFuncionario = (nome) => {
        const newFuncionarios = [...funcionarios];

        newFuncionarios.map((s) => {
            if(s.nome === nome) {
                newFuncionarios.splice(newFuncionarios.indexOf(s), 1)
            }
        })

        handleDeletarFuncionario(nome)
            .then(() => setFuncionarios(newFuncionarios))
    }

    return(
        <>
            <SideBar></SideBar>

            <main className="main-content no-decoration">
                <h1 className="title">Gerenciamento de Usuários</h1>
                <div className="news-container">
                    <div className="content-container">
                        <div className="content-inputs">
                            <TextField
                                id="nome"
                                label="Nome"
                                variant="outlined"
                                onChange={(event) =>
                                    setFuncionario({...funcionario, nome: event.target.value})
                                }
                            />
                            <TextField
                                id="senha"
                                label="Senha"
                                variant="outlined"
                                type={"password"}
                                onChange={(event) =>
                                    setFuncionario({...funcionario, senha: event.target.value})
                                }
                            />
                            <TextField
                                id="confirmar-senha"
                                label="Confirmar Senha"
                                variant="outlined"
                                type={"password"}
                                onChange={(event) => setConfirmSenha(event.target.value)}
                            />

                        </div>
                        <div className="content-actions">
                            <Button variant="contained" onClick={cadastrarFuncionario} >CADASTRAR USUÁRIO</Button>
                        </div>
                    </div>
                    <div className="list-container">
                        <h1 className="list-title">Listagem de Usuários</h1>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={funcionarios}
                                getRowId={(row) => row.nome}
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