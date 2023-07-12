import React, {useEffect, useState} from 'react'
import '../assets/admin-login.css'
import TextField from '@mui/material/TextField';
import ConcretaLogo from '../assets/img/Logo-Horizontal-MED.png'
import InputAdornment from '@mui/material/InputAdornment';
import Swal from 'sweetalert2'
import {requestLogin, requestLoginAdmin} from "../service/controller/user.js";
import {useNavigate} from "react-router-dom";
import {back} from "../service/api.js";

function AdminLogin () {
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState({});
    const navigate = useNavigate();


    const toggleShowPassword = function () {
        setShowPassword(!showPassword)
    }

    const handleLogin = async function () {
        if (! login.username || !login.password)
            return Swal.fire({
                toast: true,
                icon: 'warning',
                text: 'Preencha todos os campos para prosseguir.',
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })

        const res = await requestLogin(login.username, login.password)

        console.log(res)


        if(res.data.body === "Funcionario não existe" || res.data.body === "Email ou senha incorretos") {
            return Swal.fire({
                toast: true,
                icon: 'error',
                text: 'Email ou senha incorretos',
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true
            })
        } else {
            window.localStorage.setItem('cargos', res.data.body.cargo)
            navigate("/dashboard");
        }
    }

    return (
        <section>
            <div>
                <img src={ConcretaLogo} alt="Logo Concreta" />
            </div>
            <main>
                <TextField 
                    size="normal" 
                    label="Usuário" 
                    variant="outlined" 
                    onChange={(event) => setLogin({...login, username: event.target.value})}
                />
                    
                <TextField 
                    size="normal" 
                    type={showPassword ? "text" : "password"}
                    label="Senha" 
                    variant="outlined" 
                    onChange={(event) => setLogin({...login, password: event.target.value})}
                />

                <div className="proceed-button-div">
                    <button onClick={handleLogin}>Entrar</button>
                </div>
            </main>
        </section>
    )
}

export default AdminLogin;