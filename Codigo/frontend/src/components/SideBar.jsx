import React, {useEffect, useState} from "react";
import '../assets/side-bar.css'
import LogoConcreta from '../assets/img/Logo-Horizontal-MED.png';
import IconDashboard from '../assets/img/icon-dashboard.png';
import IconNoticias from '../assets/img/icon-noticias.png';
import IconServicos from '../assets/img/icon-servicos.png';
import IconUsuarios from '../assets/img/icon-usuarios.png';
import IconAvaliacoes from '../assets/img/avaliacoes-icon.png';
import IconProjetos from '../assets/img/projetos-icon.png';

export default function SideBar() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const admin = window.localStorage.getItem('cargo');
        if (admin === 'ADMIN') {
            setIsAdmin(true);
        }
    })

    return (
        <aside>
            <a href="/dashboard">
                <img className="logo-concreta" src={LogoConcreta} alt="logo concreta" />
            </a>
            <main>
                <a href="/dashboard"><img className="icon" src={IconDashboard} alt="Icone Dashboard" /></a>
                {isAdmin ? <a href="/dashboard/usuarios"><img className="icon" src={IconUsuarios} alt="Icone Usuarios" /></a> : <></>}
                <a href="/dashboard/servicos"><img className="icon" src={IconServicos} alt="Icone Serviços" /></a>
                <a href="/dashboard/noticias"><img className="icon" src={IconNoticias} alt="Icone Noticias" /></a>
                <a href="/dashboard/avaliacao"><img className="icon" src={IconAvaliacoes} alt="Icone Noticias" /></a>
                <a href="/dashboard/projetos"><img className="icon" src={IconProjetos} alt="Icone Projetos" /></a>
            </main>
            <div className="logout-link">
                <a href="/dashboard/login">Sair</a>
            </div>
        </aside>
    );
}