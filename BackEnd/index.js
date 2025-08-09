import express from 'express';
import userRoutes from './routes/UserRoutes.js';
import speedrunRoutes from './routes/SpeedrunRoutes.js';
import gameRoutes from './routes/GameRoutes.js';
import categoryRoutes from './routes/CategoryRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({credentials: true, origin:'http://localhost:5173'}))

app.use('/api/user', userRoutes);
app.use('/api/speedrun', speedrunRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/category', categoryRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
