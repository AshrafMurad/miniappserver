import {Request, Response, nextFunction } from 'express';
import User, { IUser } from '../models/User.js';


export const updateClicksCount = async (req: Request, res: Response, next: nextFunction) =>{
  const {clicksCount} = req.body
  try{
    const user = await User.findById(res.locals.jwtData.id)
    user.totalClicks += clicksCount 
  if(!user){
    return res.status(404).json({message: 'User not found.'})
  }
  await user.save()
  return res.status(200).json({clicksCount : user.totalClicks})
  }catch(err){
    console.log(err)
    return res.status(500).json({message: 'Something went wrong '})
  }
}

export const getUserClicks = async (req: Request, res: Response, next: nextFunction) => {
  try {
    const userId = res.locals.jwtData.id;
    if (!userId) {
      return res.status(400).json({ message: 'User ID not provided' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ points: user.totalClicks });
  } catch (err) {
    console.error('Error fetching user clicks:', err);
    return res.status(500).json({ message: 'Internal server error', cause: err.message });
  }
};

export const getLeaderBoard = async(req: Request, res: Response, next: nextFunction) =>{
  try{
    const users: IUser[] = await User.find().select('name totalClicks').sort({totalClicks: -1}).limit(10)
    return res.status(200).json(users)
  } catch(err){
  }
}



 