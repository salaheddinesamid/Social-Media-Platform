import express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { Register } from "./controllers/auth.js";
import {fileURLToPath} from "url";
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
//const path = require('path');
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb" , extended: true}));
app.use(bodyParser.urlencoded({limit :"30mb" , extended: true}));

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/** FILE STORAGE*/
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,file.originalname);
    }
});
const upload = multer({storage});
/** ROUTES AND FILES */
app.post("/auth/register", upload.single("image"), Register);
/** MONGODB */

const PORT = process.env.PORT || 3002;
mongoose.connect(process.env.MONGO_URL,{
      //useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Listening to: ${PORT}`);
    })
}).catch((Error)=>{
    console.log(Error);
})