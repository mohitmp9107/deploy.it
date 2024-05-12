import express from "express";
import path from "path";
import cors from "cors";
import simpleGit from "simple-git";
import { createClient } from "redis";
import 'dotenv/config';
import upath from 'upath';
import {generate} from "./utils";
import { getAllFiles } from "./file";
import { uploadFile } from "./aws";
const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
app.use(express.json());

const publisher = createClient();
publisher.connect();


const __dirname = path.resolve();

console.log("starting server");

app.get("/", (req,res)=>{
    console.log("hello");
    res.json({});
})

app.post("/deploy", async(req,res)=>{
    const repoUrl = req.body.repoUrl;
    // console.log(req);
    console.log(repoUrl);
    const id = generate();
    await simpleGit().clone(repoUrl,path.join(__dirname,`output/${id}`));

    const files = getAllFiles(path.join(__dirname,`output/${id}`));

    // now put files on aws s3/ cloudflare R2
    // for using R2 code remains same as s3 , just have to change config a little bit
    files.forEach(async file=>{
        const unixFilePath = upath.toUnix(file);
        console.log(unixFilePath);
        await uploadFile(unixFilePath.slice(__dirname.length+1),unixFilePath);
    })
    
    
    // putting id on redis queue
    publisher.lPush("build-queue",id);
    res.json({
        id:id
    });
})

app.listen(process.env.PORT);