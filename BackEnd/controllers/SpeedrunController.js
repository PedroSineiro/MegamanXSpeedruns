// controllers/speedrunController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUserSpeedruns = async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID de usuário inválido.' });
  }

  try {
    const runs = await prisma.speedrun.findMany({
      where: { userId },
      include: {
        game: true,
        category: true,
        reviewer: true
      }
    });
    res.json(runs);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar speedruns do usuário.' });
  }
};

export const getReviewerSpeedruns = async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ error: 'ID de usuário inválido.' });
  }

  try {
    const runs = await prisma.speedrun.findMany({
      where: {
        reviewerId: userId,
        accepted: null
      },
      include: {
        game: true,
        category: true,
        user: true
      }
    });
    res.json(runs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar speedruns para revisão.' });
  }
};

export const createSpeedrun = async (req, res) => {
  const { userId, gameId, categoryId, timeSeconds, videoUrl } = req.body;

  try {
    const reviewer = await prisma.user.findFirst({
      where: {
        isReviewer: true,
        NOT: {
          id: userId
        }
      }
    });

    if (!reviewer) {
      return res.status(400).json({ error: 'Nenhum revisor disponível.' });
    }
    console.log(timeSeconds)
    const newRun = await prisma.speedrun.create({
      data: {
        userId,
        gameId,
        categoryId,
        timeSeconds,
        videoUrl,
        reviewerId: reviewer.id,
        submittedAt: new Date()
      }
    });

    res.status(200).json(newRun);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar speedrun.' });
  }
};


export const getAllSpeedruns = async (req, res) => {
  try {
    const runs = await prisma.speedrun.findMany({
      include: { user: true, game: true, category: true }
    });
    res.json(runs);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar speedruns.' });
  }
};

export const updateSpeedrunStatus = async (req, res) => {
  const runId = parseInt(req.params.id);
  const { accepted } = req.body;
  console.log(accepted);
  try {
    const updated = await prisma.speedrun.update({
      where: { id: runId },
      data: {
        accepted
      }
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar status da speedrun.' });
  }
};

export const getFilteredSpeedruns = async (req, res) => {
  const gameId = parseInt(req.query.gameId);
  const categoryId = parseInt(req.query.categoryId);

  if (!gameId || !categoryId) {
    return res.status(400).json({ error: 'Parâmetros gameId e categoryId são obrigatórios.' });
  }
  try {
    const runs = await prisma.speedrun.findMany({
      where: {
        gameId,
        categoryId,
        accepted: true
      },
      include: {
        user: true
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    res.json(runs);
  } catch (err) {
    console.error('Erro ao buscar speedruns:', err);
    res.status(500).json({ error: 'Erro ao buscar speedruns.' });
  }
};

