import React, {useEffect, useState} from 'react';
import SideBar from "../components/SideBar";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import {Box} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {
	getProjeto,
	handleCreateProject,
	handleDeleteProject,
	handleEditarProject
} from "../service/controller/projeto.js";

export default function DashboardProjects() {
	const [projects, setProjects] = useState([]);
	const [project, setProject] = useState({})

	useEffect(() => {
		if(projects.length === 0) {
			getProjeto().then((res) => {
				console.log("t", res);
				setProjects(res.data)
			})

		}
	}, [projects])

	const columns = [
		{ field: 'id', headerName: 'Id', width: 300 },
		{ field: 'titulo', headerName: 'Título', width: 150 },
		{ field: 'descricao', headerName: 'Descrição', width: 200 },
		{ field: 'editar', headerName: 'Editar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faPen} style={{cursor: 'pointer'}} onClick={() => editarProjeto(param.id)} /> },
		{ field: 'deletar', headerName: 'Deletar', width: 100, renderCell: (param) => <FontAwesomeIcon icon={faTrash} style={{color: 'red', cursor: 'pointer'}} onClick={() => deleteProjeto(param.id)} /> },
	];

	const createProjeto = () => {
		if (!project.titulo || !project.descricao)
			return Swal.fire({
				toast: true,
				icon: 'warning',
				text: 'Preencha todos os campos para prosseguir.',
				position: 'top-end',
				showConfirmButton: false,
				timer: 4000,
				timerProgressBar: true
			})

		handleCreateProject(project.titulo, project.descricao)
			.then((res) => setProjects([...projects, res.data]))
	}

	const editarProjeto = (id) => {
		if (!project.titulo || !project.descricao)
			return Swal.fire({
				toast: true,
				icon: 'warning',
				text: 'Preencha todos os campos para prosseguir.',
				position: 'top-end',
				showConfirmButton: false,
				timer: 4000,
				timerProgressBar: true
			})

		projects.map((p) => {
			if(id === p.id) {
				p.titulo = project.titulo
				p.descricao = project.descricao
			}
		})

		console.log(projects)

		handleEditarProject(project.titulo, project.descricao, id)
			.then((res) => {
				if(res.status === 200) {
					setProjects(projects)
				}
			})
	}

	const deleteProjeto = (id) => {
		const newProjects = [...projects];

		newProjects.map((s) => {
			if(s.id === id) {
				newProjects.splice(newProjects.indexOf(s), 1)
			}
		})

		handleDeleteProject(id)
			.then(() => setProjects(newProjects))
	}



	return (
		<>
			<SideBar></SideBar>

			<main className="main-content no-decoration">
	            <h1 className="title">Gerenciamento de Projetos</h1>
	            <div className="news-container">
	                <div className="content-container">
	                    <div className="content-inputs">
	                        <TextField
	                            id="titulo"
	                            label="Titulo"
	                            variant="outlined"
	                            onChange={(event) => setProject({...project, titulo: event.target.value})}
	                        />
							<TextField
	                             id="descricao"
	                             label="Descrição"
	                             variant="outlined"
								 onChange={(event) => setProject({...project, descricao: event.target.value})}
							/>
	                    </div>
	                    <div className="content-actions">
	                        <Button variant="contained" onClick={createProjeto}>CADASTRAR PROJETO</Button>
	                    </div>
	                </div>
	                <div className="list-container">
	                    <h1 className="list-title">Listagem de Projetos</h1>
	                    <Box sx={{ height: 400, width: '100%' }}>
	                        <DataGrid
	                            rows={projects}
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
	);
}