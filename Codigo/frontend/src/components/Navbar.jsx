import React from 'react';
import ConcretaLogo from '../assets/img/Logo-Horizontal-MED.png';
import '../assets/navbar.css';
import '../assets/fonts.css'

export default function Navbar({ dark }) {
    return (
        <nav className="navigation">
            <div className="logo">
                <a href="/">
                    <img src={ConcretaLogo} alt="Logo Concreta" />
                </a>
            </div>
            <div className="content-links">
                <a href="/feedbacks-clientes" style={{color: (dark) ? "#000" : "#FFF"}}>CLIENTES</a>
                <a href="" style={{color: (dark) ? "#000" : "#FFF"}}>NOSSOS SERVIÇOS</a>
                <a href="/projetos" style={{color: (dark) ? "#000" : "#FFF"}}>PROJETOS</a>
                <a href="/quem-somos" style={{color: (dark) ? "#000" : "#FFF"}}>QUEM SOMOS</a>
                <div className="content-button">
                    <button>SOLICITAR SERVIÇO</button>
                </div>
            </div>
        </nav>
    );
}