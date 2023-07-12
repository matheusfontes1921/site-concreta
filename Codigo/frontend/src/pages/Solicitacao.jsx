import React from 'react'
import NavBar from './Navbar.jsx'
import Footer from '../components/Footer.jsx'
import '../assets/solicitacao.css'
import '../assets/fonts.css'
import FooterImage from '../assets/img/footer-image.png';
import ConcretaLogo from '../assets/img/Logo-Horizontal-MED.png';
import EmailIcon from '../assets/img/email-icon.png';
import PhoneIcon from '../assets/img/phone-icon.png';
import InstagramIcon from '../assets/img/instagram-icon.png';
import FacebookIcon from '../assets/img/facebook-icon.png';
import LinkedInIcon from '../assets/img/linkedin-icon.png';

export default function Solicitacao({ dark }) {
    return (
        <><div className="navigation">
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
    </div>
        <div className="body">
                <h1>
                    <span className='first'> SOLICITAR </span>
                    <span className='second'>SERVIÇO</span>
                </h1>
                <p><b>Nosso objetivo é fornecer a você o melhor atendimento possível e a melhor solução para suas demandas. Por<br />
                    isso, pedimos que você preencha o formulário de forma detalhada e honesta, para que possamos entender suas <br />
                    expectativas e criar um plano personalizado para atendê-las. </b></p>
                <button className="comecar"> Para Começar</button>   
                <button className="mudar">Para Mudar</button> 
                <button className="cuidar">Para Cuidar</button>
                </div>
            <div className="contato">
                <h1>Contato</h1>
                <p><b>Estamos aqui para responder a qualquer pergunta ou solicitação que você possa ter. Por favor, preencha o <br/>
                    formulário abaixo com suas informações de contato e a mensagem que deseja enviar. Nossa equipe de suporte<br/>
                    responderá o mais breve possível. Obrigado por nos escolher!</b></p>
                    <ul className="input-one">
                    <input type="text" class="nome" placeholder="Nome Completo"/>
                    <input type="text" class="telefone" placeholder="Telefone"/>
                    <input type="text" class="email" placeholder="E-mail"/>
                    <div class="select-wrapper">
                    <select name="options" id="frutas">
                    <option value="" selected disabled hidden>Como nos descobriu?</option>
                    <option value="wpp">WhatsApp</option>
                    <option value="insta">Instagram</option>
                    <option value="internet">Linkedin</option>
                    <option value="indicacao">Indicação</option>
                    </select>
                    </div>
                    <input type="text" class="objetivos" placeholder="Objetivos"/>
                    </ul>
                    <div className="finalizar">
                        <h1>Finalizar</h1>
                        <p><b>Selecione "Enviar via WhatsApp" para enviar todas as informações diretamente para o número da Concreta via<br/>
                         WhatsApp. Alternativamente, você pode clicar no botão "Enviar Email" e enviar suas informações para o endereço <br/>
                         de email da Concreta. Nossa equipe está sempre pronta para ajudar! Escolha a opção que melhor atenda às suas<br />
                          necessidades e entraremos em contato o mais breve possível.</b></p>
                          <ul className="envios">
                          <button className="wpp">
                            ENVIAR VIA WHATSAPP
                          </button>
                          <button className="button-email">
                            ENVIAR E-MAIL
                          </button>
                          </ul>
                          <p className="termos"><b> Ao seguir, você concorda com os <a href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm" target="_blank" className="termosDeUso"><u>termos de uso</u></a></b></p>
                    </div>
                    
                    
            </div>
            <div className="footer">
               <ul>
                 <Footer />
                 </ul>
            </div>
            
        </>
    );
}