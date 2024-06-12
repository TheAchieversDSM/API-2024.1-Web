import InputPassword from "../../components/password";
import Container from "../../components/container";
import { Sidebar } from "../../components/sidebar";
import { useEffect, useState } from "react";
import Input from "../../components/input";
import { useNavigate } from "react-router";
import Btn from "../../components/button";
import Box from "../../components/box";
import Swal from 'sweetalert2'
import './index.css'
import isAuthenticated from "../../utils/auth";
import axios from "axios";
import url from "../../services/config";

interface IError {
    email?: boolean,
    name?: boolean,
    pwd?: boolean
}

export default function CreateUser() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const [pwdConf, setPwdConf] = useState<string>('')
    const [validation, setValidation] = useState<IError>({ email: false, name: false, pwd: false })

    function setEmailValue(e: any) {
        setEmail(e.target.value)
    }

    function setNameValue(e: any) {
        setName(e.target.value)
    }

    function setPwdValue(e: any) {
        setPwd(e.target.value)
    }

    function setPwdConfValue(e: any) {
        setPwdConf(e.target.value)
    }

    useEffect(() => {
        isValid();
    }, [email, name, pwd, pwdConf])

    function isValid() {
        const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        const regexName = /^[^\d\s]+(?:\s+[^\d\s]+){1,}$/
        const regexPwd = /^.{6,}$/

        setValidation({
            email: regexEmail.test(email),
            name: regexName.test(name),
            pwd: regexPwd.test(pwd)
        });
    }

    function signUp() {
        if (!validation.email) {
            Swal.fire({
                title: "Email inválido!",
                text: `O email não segue o formato 'email@exemplo.com'.`,
                icon: "error"
            });
            return;
        }

        if (!validation.name) {
            Swal.fire({
                title: "Nome inválido!",
                text: `O nome deve ter, no mínimo, dois nomes.`,
                icon: "error"
            });
            return;
        }

        if (!validation.pwd) {
            Swal.fire({
                title: "Senha inválida!",
                text: `A senha deve ter, no mínimo, 6 dígitos.`,
                icon: "error"
            });
            return;
        }

        if (pwd !== pwdConf) {
            Swal.fire({
                title: "Senhas diferentes!",
                text: `As senhas informadas não são iguais.`,
                icon: "error"
            });
            return;
        }

        axios.post(`${url.baseURL}/users/signup`, {
            name: name,
            email: email,
            password: pwd
        }).then(() => {
            setEmail('');
            setName('');
            setPwd('');
            setPwdConf('');

            Swal.fire({
                title: "Usuário cadastrado!",
                text: `O usuário ${name} foi cadastrado com sucesso.`,
                icon: "success"
            });
        }).catch((e) => {
            Swal.fire({
                title: "Email já cadastrado!",
                text: `Email ${email} já cadastrado, tente outro.`,
                icon: "error"
            });
        })
    }

    useEffect(() => {
        const auth = isAuthenticated()

        if (auth === false) {
            navigate('/')
        }
    })

    return (
        <>
            <Sidebar />
            <Container>
                <h1>Cadastro de Usuários</h1>
                <Box titulo={""}>

                    <div className="create-container">
                        <Input
                            name='email'
                            value={email}
                            placeholder='Email'
                            onChange={(e: any) => setEmailValue(e)}
                            width={625}
                        />

                        <Input
                            name='name'
                            value={name}
                            placeholder='Nome'
                            onChange={(e: any) => setNameValue(e)}
                            width={625}
                        />


                        <div className="adjust-input" style={{ marginLeft: 15 }}>
                            <InputPassword
                                name='pwd'
                                value={pwd}
                                placeholder='Senha'
                                onChange={(e: any) => setPwdValue(e)}
                                width={625}
                            />

                            <InputPassword
                                name='pwdconfirm'
                                value={pwdConf}
                                placeholder='Repetir a senha'
                                onChange={(e: any) => setPwdConfValue(e)}
                                width={625}
                            />
                        </div>

                        <Btn
                            name='button'
                            label={'Cadastrar'}
                            onClick={() => signUp()}
                            width={375}
                            bg='linear-gradient(to bottom right, #D78C4B, #764D29)'
                        />
                    </div>

                </Box>

            </Container>
        </>
    )
}