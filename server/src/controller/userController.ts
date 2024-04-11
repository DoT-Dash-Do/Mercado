import { Request,Response } from "express";
import bcrypt from 'bcrypt';
import User from "../models/user";
export const regUser = async(req:Request,res:Response) =>{
    const {username,email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password,10);
    try {
      const newUser = await User.create({ username, email, password:hashedPassword });
      res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
      }
}