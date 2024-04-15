import express from "express";
import { createEmployee, employeeDetails, loginEmployee, verifyToken } from "../controllers/employee";
const router = express.Router();

router.post("/admin/create/employee", createEmployee);

router.post("/employee/signIn", loginEmployee);

router.get("/employee/details", verifyToken, employeeDetails);

export default router;