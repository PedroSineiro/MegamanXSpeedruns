import express from 'express';
import { createUser, getUsers, login } from '../controllers/UserController.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', login)
router.get('/users', getUsers);

export default router;
