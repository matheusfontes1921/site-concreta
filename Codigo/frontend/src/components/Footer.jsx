import React from 'react';
import FooterImage from '../assets/img/footer-image.png';
import ConcretaLogo from '../assets/img/Logo-Horizontal-MED.png';
import EmailIcon from '../assets/img/email-icon.png';
import PhoneIcon from '../assets/img/phone-icon.png';
import InstagramIcon from '../assets/img/instagram-icon.png';
import FacebookIcon from '../assets/img/facebook-icon.png';
import LinkedInIcon from '../assets/img/linkedin-icon.png';
import DashboardIcon from '../assets/img/dashboard-icon.png';

export default function Footer() {
    return (
        <footer style={{backgroundImage: `url(${FooterImage})`}} className="landing-footer">
            <div className="first-part-footer">
                <img src={ConcretaLogo} alt="Logo Concreta" />
                <span>
                    <span>CONCRETA</span><br />
                    Consultoria e Serviços
                </span>
            </div>
            <div className="second-part-footer">
                <span className="footer-infomration">
                    <img className="footer-email-icon" src={EmailIcon} alt="Email Icon" />
                    <span>atendimento@concretaconsultoria.com.br</span>
                </span>
                <span className="footer-infomration">
                    <img className="footer-phone-icon" src={PhoneIcon} alt="Phone Icon" />
                    <span>(61) 99123-3216 ou (61) 99430-2758</span>
                </span>
                <span className='footer-infomration'>
                    <img className="footer-phone-icon" src={DashboardIcon} alt="Phone Icon" />
                    <a className="footer-link" href="/dashboard">Acessar Painel de Admin</a>
                </span>
                <div className="social-media">
                    <a href="https://instagram.com/concretaej"><img className="social-media-icon" src={InstagramIcon} alt="Instagram Icon" /></a>
                    <a href="https://www.facebook.com/concreta.consultoriaeservicos"><img className="social-media-icon" src={FacebookIcon} alt="Facebook Icon" /></a>
                    <a href="https://www.linkedin.com/company/concreta-consultoria-&-servi-os"><img className="social-media-icon" src={LinkedInIcon} alt="Linkedin Icon" /></a>
                </div>
            </div>
        </footer>
    );
}