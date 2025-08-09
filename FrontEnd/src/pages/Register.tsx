// src/pages/Login.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Body from '../assets/components/Body/Body';
import Input from '../assets/components/Input/Input';
import Button from '../assets/components/Button/Button';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isReviewer, setIsReviewer] = useState(false);
    const [erro, setErro] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log({email, password});
        try {
            await register(name, password, confirmPassword, email, isReviewer);
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
            className='row'
        >
            <h1 className="white-text">Cadastro</h1>

            {erro && <p className="text-red-500">{erro}</p>}
            <Input
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <Input
            type="email"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Input
            type="password"
            label="Senha"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            />
            <Input
            type="password"
            label="Confirmação de Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Input
                label="É moderador?"
                type="checkbox"
                checked={isReviewer}
                onChange={(e) => setIsReviewer(e.target.checked)}
            />
            <div>
                <Button
                type="submit"
                label="Cadastrar"
                />
            </div>
            
        </form>
        </Body>
    );
}
