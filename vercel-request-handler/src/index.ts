import express from "express";
import cors from "cors";
import AWS from 'aws-sdk';
import 'dotenv/config';

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

const app = express();
app.use(cors());

app.use(express.json());

console.log('starting server on 3001');

app.get("/*",async(req,res)=>{
    // id.google.com
    console.log('innside');
    const host = req.hostname;
    const id = host.split(".")[0];
    const filePath = req.path;
    // console.log(id);
    // console.log(filePath);
    
    const contents = await s3.getObject({
        Bucket:"vercel-mohit",
        Key:`dist/${id}${filePath}`,
    }).promise(); 
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript";
    res.set("Content-Type", type);
    res.send(contents.Body);
})

app.listen(3001);

