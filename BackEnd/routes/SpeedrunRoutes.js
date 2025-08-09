import express from 'express';
import {
  getUserSpeedruns,
  getReviewerSpeedruns,
  getFilteredSpeedruns,
  createSpeedrun,
  getAllSpeedruns,
  updateSpeedrunStatus
} from '../controllers/SpeedrunController.js';

const router = express.Router();

router.get('/user/:userId', getUserSpeedruns);

router.get('/reviewer/:userId', getReviewerSpeedruns);

router.post('/', createSpeedrun);

router.get('/all', getAllSpeedruns);

router.get('/', getFilteredSpeedruns);

router.patch('/:id', updateSpeedrunStatus);



export default router;
