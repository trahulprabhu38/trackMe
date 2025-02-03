import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"


import userRoutes from './routes/userRoutes.js'
import { connectToDb } from "./config/modelConfig.js"

const app = express()
dotenv.config()
connectToDb()

// Middleware
app.use(bodyParser.json())
app.use(cors())


//Routes
app.use("/api",userRoutes)


app.listen(process.env.PORT,()=>{
    console.log("connected to the port :",process.env.PORT)
})
