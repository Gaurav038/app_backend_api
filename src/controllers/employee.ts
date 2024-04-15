import { Request, Response } from "express";
import { employeeModel } from "../model/employee";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = "dckjbdschjbdchjdbh";
export async function createEmployee(req: Request, res: Response) {
  try {
    const { email } = req.body;

    const userEmail = await employeeModel.findOne({ email });
    if (userEmail) {
      res.status(500).json({ error: "User already exists" });
    }
    const employee = await employeeModel.create(req.body);
    res.status(201).json({ employee });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function loginEmployee(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({ error: "Please Enter Email & Password" });
    }
    const user = await employeeModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(500).json({ error: "Invalid email or password" });
    }

    if (user.password != password) {
      return res.status(500).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, SECRET_KEY);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function verifyToken(req: any, res: Response, next: any) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(403).json({ error: "Token is missing" });
    }
    const decoded: any = jwt.verify(token, SECRET_KEY);
    req.user = await employeeModel.findById(decoded?.id);
    next();
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export async function employeeDetails(req: any, res: Response) {
  try {
    const id = req?.user?.id
    const user = await employeeModel.findById(id);
    if (!user) {
      return res.status(500).json({ error: "User doesn't exists" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
