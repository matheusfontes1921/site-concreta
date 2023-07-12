import React from "react";
import SideBar from "../components/SideBar";
import '../assets/dashboard.css'

export default function Dashboard() {
    return (
        <>
            <SideBar></SideBar>

            <main className="main-content no-decoration">
                <h1 className="title">Bem Vindo de Volta</h1>

                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <h2>Serviço mais solicitado <br/>Nome do Serviço</h2>
                        <div className="card-value">
                            <span>120</span>
                            <p>Vezes desde o inicio</p>
                        </div>
                    </div>
                    <div className="dashboard-card">
                        <h2>Serviço Solicitados Via <br/>Whatsapp</h2>
                        <div className="card-value">
                            <span>120</span>
                            <p>Vezes desde o inicio</p>
                        </div>
                    </div>
                    <div className="dashboard-card">
                        <h2>Serviço Solicitados Via <br/>Email</h2>
                        <div className="card-value">
                            <span>120</span>
                            <p>Vezes desde o inicio</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    ) 
}