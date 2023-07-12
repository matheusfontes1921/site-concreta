import React from 'react'
import { useEffect } from 'react';
import '../assets/login.css';


 function Login(){
    // let imgs = useRef(null);
    // let headers = useRef(null);
    // let logos = useRef(null);
    // let form = useRef(null);

    // useEffect(()=> {
    //     TweenMax.to(imgs,1,{delay:0.4,opacity:1, ease: 'easeOut'})
    //     TweenMax.to(logos,2,{delay:1.5,opacity:1,ease:'easeOut'})
    //     TweenMax.to(headers,2,{delay:2,opacity:1, ease:'easeOut'})
    //     TweenMax.to(form,2,{delay:2.5,opacity:1, ease:'easeOut'})
    // })
    
    return(
        <div className="wrapper">
            <div className="separate" id="start">
                <div className="banner" ref={el => imgs = el}>
                    <img src ={main} alt="main-img"/>
                </div>
            </div>
            <div className="separate" id="form-selection">
                <div className="form-style">
                    <div className="logo" ref={el => logos = el}>
                        <img src={logo} alt="logo-img" />
                    </div>
                    <h2 ref={el => headers = el}>Bem-vindo ao sistema de moedas estudantis da PUC MINAS</h2>
                    <form ref={el => form = el}>
                        <div className="fields">
                            <label>Nome de usuário</label><br/>
                            <input type="text" placeholder="Digite seu nome de usuário"/>
                            <p>Esqueceu a senha?</p>
                        </div>
                        <input type="submit" value="Login" className="submit-btn"/>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;