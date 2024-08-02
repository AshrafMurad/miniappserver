import {Router} from 'express'
import userRoutes from './user-routes.js';
import clicksRoute from './clicks-route.js';

const appRouter = Router()

appRouter.use('/user', userRoutes)
appRouter.use('/clicks', clicksRoute)

export default appRouter;