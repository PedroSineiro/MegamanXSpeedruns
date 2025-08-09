// src/pages/Login.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './pages.css'
import Body from '../assets/components/Body/Body';
import Input from '../assets/components/Input/Input';
import Button from '../assets/components/Button/Button';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });

        try {
            await login(email, password);
            setErro('');
            navigate('/');
        } catch (err) {
            console.error(err);
            setErro('Usuário ou senha inválidos');
        }
    };

    return (
        <Body>
            <form
                onSubmit={handleSubmit}
                className="p-8 rounded shadow-md w-full max-w-sm"
            >
                <h1 className="white-text">Login</h1>

                {erro && <p className="text-red-500">{erro}</p>}

                <Input
                    type="email"
                    label="E-mail:"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    label="Senha:"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    type="submit"
                    label="Entrar"
                />
                 <div style={{marginTop: "20px"}}><span className='link' style={{marginTop: "20px"}}><Link to="/register">Não possui Login? Cadastre-se</Link></span></div>
            </form>
           
            
        </Body>
    );
}
