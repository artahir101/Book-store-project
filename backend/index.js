import express from "express"
import { PORT, MONGODB_URL } from "./config.js"
import mongoose from "mongoose"
import booksRouter from "./routes/booksRoute.js"

const app = express()
app.use(express.json())
app.use("/books", booksRouter)

mongoose
.connect(MONGODB_URL)
.then(() => {
    console.log("connected to database...")
    app.listen(PORT, () => {
        console.log("server started...")
    })
})
.catch((error) => {
    console.log(error)
})