import React, {useEffect, useState} from "react";
import Navbar from "../components/Navbar";
import FeedbackCard from '../components/FeedbackCard';
import '../assets/feedbacks.css'
import {getAvaliacao} from "../service/controller/avalicao.js";

export default function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        if(feedbacks.length === 0) {
            getAvaliacao().then((res) => {
                console.log("res", res)
                setFeedbacks(res.data.body)
            })
        }

        console.log("projetos", feedbacks);
    }, [feedbacks])

    return (
        <>
            <Navbar dark />
            <div className="feedbacks-content">
                <h1 className="feedbacks-title">FEEDBACKS DE NOSSOS <span>CLIENTES</span></h1>
                <div className="feedbacks-content-cards">
                    {feedbacks.map((feedback) => {
                        return <FeedbackCard
                            key = {feedback.id}
                            image={feedback.imagem.url}
                            job={feedback.projeto.titulo}
                            subtitle={feedback.subtitulo}
                            name={feedback.nome}
                            feedback={feedback.descricao}
                        />

                    })}
                </div>
            </div>
        </>
    );
}
