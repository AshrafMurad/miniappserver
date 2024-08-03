import { Response, Request } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants";

export const getAllUSers = async (req: Request, res: Response, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "ERROR", cause: err.message });
  }
};

export const signupUser = async (req: Request, res: Response, next) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(401).send("user already exist");
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      expires,
      httpOnly: true,
      signed: true
    });

    return res
      .status(200)
      .json({
        message: "User created successfully",
        name: user.name,
        email: user.email,
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "ERROR", cause: err.message });
  }
};

export const loginUser = async (req: Request, res: Response, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("user not found");
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("password is incorrect");
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
    });
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      expires,
      httpOnly: true,
      signed: true
    });
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "ERROR", cause: err.message });
  }
};

export const verifyUser = async (req: Request, res: Response, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not found or Token not Found");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "ERROR", cause: err.message });
  }
};
export const userLogout = async (req: Request, res: Response, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("user not found or Token not Found");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      res.status(401).send("Permissions didn't match");
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
    });
    return res.status(200).json({ message: "OK" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "ERROR", cause: err.message });
  }
};
