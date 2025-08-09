import prisma from "../db/conn.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { respondWithToken } from '../helpers/Auth.js'

export const createUser = async (req, res) => {
  const { username, email, password, confirmPassword, isReviewer = false } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }
    if(username==""){
      return res.status(409).json({ error: 'Nome é obrigatório.' });
    }
    if(email==""){
      return res.status(409).json({ error: 'Email é obrigatório.' });
    }
    if(password==""){
      return res.status(409).json({ error: 'Senha é obrigatória.' });
    }
    if(confirmPassword==""){
      return res.status(409).json({ error: 'Senha de confirmação é obrigatória.' });
    }
    if(password!=confirmPassword){
      return res.status(409).json({ error: 'Senha diferente da confirmação de senha.' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
     const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash: hashedPassword,
        isReviewer,
      },
    });

    respondWithToken(user, res); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email=="") {
      return res.status(400).json({ error: 'Email não fornecido.' });
    }
    if (password=="") {
      return res.status(400).json({ error: 'Senha não fornecida.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado.' });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    respondWithToken(user, res);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao logar.' });
  }
};


// Buscar todos os usuários
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};
