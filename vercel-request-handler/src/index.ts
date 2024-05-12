import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

console.log('starting server on 3001');

app.get("/*",async(req,res)=>{
    const host = req.body.host;
    const id = host.split(".")[0];
    console.log(id);

     
    res.json({id:id});
})

app.listen(3001);

