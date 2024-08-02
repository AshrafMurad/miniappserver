import {Router} from 'express'
import userRoutes from './user-routes.js';
import clicksRoute from './clicks-route.js';

const appRouter = Router()


appRouter.get('/', (req, res) => {
  res.send('api');
});

appRouter.use('/users', userRoutes);
appRouter.use('/clicks', clicksRoute);
export default appRouter;