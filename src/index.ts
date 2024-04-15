import express, {Application, Request, Response} from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import router from "./router";

const app: Application = express()
const port: number = 8000
dotenv.config()

app.get('/', (req: Request, res: Response)=>{
    res.send("server is running okay");
})
app.use(express.json());
app.use(router);
if(process.env.DB_URL){
    mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
        console.log(`mongdb connected with server: ${data.connection.host}`);
      });;
}
mongoose.connection.on('error', (error: Error) => console.log(error));

app.listen(port, ()=> {
    console.log("Server is Running on port",port);
})