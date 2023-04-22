import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllHotels, getRooms } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.all('/*', authenticateToken).get('/', getAllHotels).get('/:hotelId', getRooms);

export { hotelsRouter };
