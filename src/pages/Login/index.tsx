import { ChangeEvent, MouseEvent, useState } from 'react';
import logo from '../../assets/imgs/logo.jpeg';
import Input from '../../components/input';
import './index.css'
import InputPassword from '../../components/password';
import Btn from '../../components/button';

export default function Login() {
    const [email, setEmail] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')

    function setEmailValue(e: any) {
        setEmail(e.target.value)
        console.log(e.target.value);
    }

    function setPwdValue(e: any) {
        setPwd(e.target.value)
        console.log(e.target.value);
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
                    onClick={() => console.log('oi')}     
                    width={375}
                    bg='linear-gradient(to bottom right, #D78C4B, #764D29)'
                    />
                </div>
            </div>
        </div>
    )
}