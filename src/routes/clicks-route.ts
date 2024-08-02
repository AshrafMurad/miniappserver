import {Router} from 'express'
import { verifyToken } from '../utils/token-manager';
import { userClicksValidator, validate } from '../utils/validation';
import { getLeaderBoard, getUserClicks, updateClicksCount } from '../controllers/clicks';

const clicksRoute = Router()
clicksRoute.post('/new', validate(userClicksValidator),verifyToken, updateClicksCount)
clicksRoute.get('/', verifyToken, getUserClicks)
clicksRoute.get('/leaderboard', getLeaderBoard )
export default clicksRoute;