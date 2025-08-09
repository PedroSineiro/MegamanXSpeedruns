import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getGames = async (req, res) => {
  try {
    const games = await prisma.game.findMany();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};