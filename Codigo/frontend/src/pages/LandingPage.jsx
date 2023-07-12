import React, {useEffect, useState} from "react";
import '../assets/landing.css';
import Navbar from "../components/Navbar";
import FirstLandingImage from '../assets/img/first-background-landing.png';
import SecondLandingImage from '../assets/img/second-background-landing.png'
import NewsLandingImage from '../assets/img/news-image-landing.png'
import ParaCuidarImage from '../assets/img/paracuidar.png';
import ParaMudarImage from '../assets/img/paramudar.png';
import ParaComecarImage from '../assets/img/paracomecar.png';
import MapImage from '../assets/img/location-image.png';
import LocationIcon from '../assets/img/locationicon.png';
import PupilaImage from '../assets/img/pupila.png';
import TipoxImage from '../assets/img/tipox.png';
import UmberImage from '../assets/img/umber.png';
import ExcipiaImage from '../assets/img/excipia-logo.png';
import EsecImage from '../assets/img/esec.png';
import EngefisaImage from '../assets/img/engefisa.png';
import FundacaoEstudarImage from '../assets/img/fundacao_estudar.png';
import StudioImage from '../assets/img/studio.png';
import Footer from "../components/Footer";
import NewsCard from '../components/NewsCard';
import {getNoticias} from "../service/controller/noticia.js";
import {getServicos} from "../service/controller/servico.js";
import {getCP} from "../service/controller/landingPage.js";

export default function LandingPage() {
    const [noticias, setNoticias] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [cps, setCps] = useState([]);


    useEffect(() => {
        if (noticias.length === 0) {
            getNoticias().then((res) => {
                setNoticias(res.data)
            })
        }
        if (servicos.length === 0) {
            getServicos().then((res) => {
                setServicos(res.data)
            })
        }
        if (cps.length === 0) {
            getCP().then((res) => {
                setCps(res)
            })
        }
    }, [noticias])
    return (
        <>
            <Navbar />
            <div className="first-image-landing" style={{backgroundImage: `url(${FirstLandingImage})`}}>
            </div>
            <div className="news-landing">
                <div className="landing-news-item" style={{backgroundImage: `url(${NewsLandingImage})`}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F4F5F7" fill-opacity="1" d="M0,0L80,26.7C160,53,320,107,480,122.7C640,139,800,117,960,112C1120,107,1280,117,1360,122.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
                    <div className="landing-sub-title">
                        <h1>Últimas Notícias</h1>
                    </div>
                    <div className="news-cards">
                        {noticias.map(noticia =>
                            <NewsCard title={noticia.titulo} url={noticia.url} description={noticia.conteudo} />
                        )}
                    </div>
                    <div className="wave">
                        <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 151.7333333333333,176.39999999999998 303.4666666666666,152.79999999999998 450,170 C 596.5333333333334,187.20000000000002 737.8666666666666,245.2 902,257 C 1066.1333333333334,268.8 1253.0666666666666,234.4 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#F4F5F7" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
                    </div>
                </div>
            </div>
            
            <div className="second-content" style={{backgroundImage: `url(${SecondLandingImage})`}}>
                <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150"><path d="M 0,400 C 0,400 0,200 0,200 C 170.66666666666669,163.86666666666667 341.33333333333337,127.73333333333332 501,134 C 660.6666666666666,140.26666666666668 809.3333333333333,188.93333333333334 964,207 C 1118.6666666666667,225.06666666666666 1279.3333333333335,212.53333333333333 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="#F4F5F7" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-0" transform="rotate(-180 720 200)"></path></svg>
                <div className="landing-sub-title">
                    <h1>NOSSOS SERVIÇOS</h1>
                </div>
                <div className="landing-cards">
                    <div className="landing-card">
                        <a href="#">
                            <img src={ParaComecarImage} alt="Para começar imagem" />
                        </a>
                        <p>Para Começar</p>
                    </div>
                    <div className="landing-card">
                        <a href="#">
                            <img src={ParaMudarImage} alt="Para mudar imagem" />
                        </a>
                        <p>Para Mudar</p>
                    </div>
                    <div className="landing-card">
                        <a href="#">
                            <img src={ParaCuidarImage} alt="Para cuidar imagem" />
                        </a>
                        <p>Para Cuidar</p>
                    </div>
                    {servicos.map(servico =>
                        <div className="landing-card">
                            <a href="#">
                                <img src={servico.imagem.url} alt="Para cuidar imagem" />
                            </a>
                            <p>{servico.nome}</p>
                        </div>
                    )}
                </div>
                <div className="landing-service-button">
                    <button>SOLICITAR SERVIÇO</button>
                </div>

                <div className="part-container">
                    <div className="prt-container">
                        <div className="clients-item">
                            <h1>CLIENTES</h1>
                            <div className="clients-container">
                                <img className="client-image" src={ExcipiaImage} alt="Logo Excipia" />
                                <img className="client-image" src={PupilaImage} alt="Logo Pupila" />
                                <img className="client-image" src={UmberImage} alt="Logo Umber" />
                                <img className="client-image" src={TipoxImage} alt="Logo Tipox" />
                                {cps.map(cp => {
                                    if(cp.tipo === "Cliente") {
                                        return (
                                            <img className="client-image" src={cp.imagem.url} alt="Logo Tipox" />
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="prt-container" style={{marginTop: '10rem'}}>
                        <div className="clients-item">
                            <h1>PARCEIROS</h1>
                            <div className="clients-container">
                                <img className="client-image" src={EsecImage} alt="Logo ESEC" />
                                <img className="client-image" src={EngefisaImage} alt="Logo Engefisa" />
                                <img className="client-image" src={FundacaoEstudarImage} alt="Logo Fundação Estudar" />
                                <img className="client-image" src={StudioImage} alt="Logo Studio" />
                                {cps.map(cp => {
                                    if(cp.tipo === "Parceiro") {
                                        return (
                                            <img className="client-image" src={cp.imagem.url} alt="Logo Tipox" />
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="separator" />

                    <div className="location">
                        <div className="map">
                            <img src={MapImage} alt="Location Image" />
                        </div>
                        <div className="location-name">
                            <img className="location-icon" src={LocationIcon} alt="Location Icon" />
                            <p>
                                Universidade de Brasília – Campus <br />
                                Universitário Darcy Ribeiro Dpto. de <br />
                                Engenharia Civil e Ambiental – Sala CT 49/18
                            </p>
                        </div>
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    );
}