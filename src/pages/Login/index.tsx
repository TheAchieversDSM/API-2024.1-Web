import InputPassword from '../../components/password'
import { useNavigate } from "react-router-dom"
import logo from '../../assets/imgs/logo.jpeg'
import Input from '../../components/input'
import Btn from '../../components/button'
import url from '../../services/config'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import './index.css'
import isAuthenticated from '../../utils/auth'

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const navigate = useNavigate();

    function setEmailValue(e: any) {
        setEmail(e.target.value)
    }

    function setPwdValue(e: any) {
        setPwd(e.target.value)
    }

    function login() {
        axios.post(`${url.baseURL}/users/login`, {
            email: email,
            password: pwd
        }).then((res) => {
            localStorage.setItem('token', res.data.token)
            
            navigate('/dashboard')
        }).catch((error) => {
            console.log(error)

            Swal.fire({
                title: "Usuário inválido!",
                text: `Email e/ou senha inválidos.`,
                icon: "error"
            });
        })
    }

    return (
        <div className="login-main">
            <div className="login-container">
                <img src={logo} />
                <div className="form-content">
                    <Input
                        value={email}
                        placeholder='Email'
                        onChange={(e: any) => setEmailValue(e)}
                    />

                    <InputPassword
                        value={pwd}
                        placeholder='Senha'
                        onChange={(e: any) => setPwdValue(e)}
                    />

                    <Btn
                        label={'Entrar'}
                        onClick={() => login()}
                        width={375}
                        bg='linear-gradient(to bottom right, #D78C4B, #764D29)'
                    />
                </div>
            </div>
        </div>
    )
}