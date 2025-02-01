import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import router from "./routes/routes.js"

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

mongoose.connect("mongodb://localhost:27017/tecEduca")
.then(() => console.log('banco de dados conectado!'))
.catch((error) => console.log("erro ao conectar banco d dados", error))

app.listen(3000)