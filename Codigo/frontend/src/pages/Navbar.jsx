import React from 'react';
import ConcretaLogo from '../assets/img/Logo-Horizontal-MED.png';
import '../assets/Navbar.css';
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
                <a href="/feedbacks-clientes" style={{color: (dark) ? "#000" : "#000"}}>CLIENTES</a>
                <a href="" style={{color: (dark) ? "#000" : "#000"}}>NOSSOS SERVIÇOS</a>
                <a href="/projetos" style={{color: (dark) ? "#000" : "#000"}}>PROJETOS</a>
                <a href="/quem-somos" style={{color: (dark) ? "#000" : "#000"}}>QUEM SOMOS</a>
                <div className="content-button">
                    <button>SOLICITAR SERVIÇO</button>
                </div>
            </div>
        </nav>
    );
}