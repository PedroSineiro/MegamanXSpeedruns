import express from 'express';
import {
  getGames
} from '../controllers/GameController.js';

const router = express.Router();

router.get('/', getGames);

export default router;
