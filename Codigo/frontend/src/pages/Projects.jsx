import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import '../assets/projects.css';
import ProjectsCard from "../components/ProjectsCard";
import {getProjeto} from "../service/controller/projeto.js";

export default function Proejcts() {
    const [projetos, setProjetos] = useState([])

    useEffect(() => {
        if(projetos.length === 0) {
            getProjeto().then((res) => {
                console.log(res)
                if(res.data.length === 0) {
                    setProjetos([{id: 0, titulo: "Lorem Ipsum", descricao: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis accusantium inventore quas odit culpa numquam, tempora dignissimos omnis praesentium in, quod sit explicabo nostrum accusamus dolorem? Odit dignissimos facere sequi?", listaImagens: ["", ""]}])
                } else {
                    setProjetos(res.data)
                }
            })
        }

        console.log("projetos", projetos);
    }, [projetos])

    return (
        <>
            <Navbar dark />
            <div className="projects-content">
                <h1 className="projects-title">NOSSOS <span>PROJETOS</span></h1>
                <div className="projects-cards-container">
                    {projetos.map((projeto) => {
                        return <ProjectsCard
                            key = {projeto.id}
                            images={["", ""]}
                            title={projeto.titulo}
                            description={projeto.descricao}
                        />

                    })}
                </div>
            </div>
        </>
    );
}