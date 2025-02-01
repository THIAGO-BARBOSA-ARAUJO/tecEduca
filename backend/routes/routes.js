import express from "express"
import { registrationStudent, getAllStudents, getStudent, updateStudent, deleteStudent } from "../controllers/controllers.js"

const router = express.Router()

router.post("/student", registrationStudent)

router.get("/student", getStudent)

router.get("/students", getAllStudents)

router.put("/student/:id", updateStudent)

router.delete("/student/:id", deleteStudent)

export default router