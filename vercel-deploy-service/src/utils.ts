import {exec,spawn} from 'child_process';
import path from "path";


export const buildProject = (id:string)=>{
    return new Promise((resolve)=>{
        // console.log(path.join(__dirname.slice(0,-3), `output/${id}`));
        const child = exec(`cd ${path.join(__dirname.slice(0,-3), `output/${id}`)} && npm install && npm run build`);
        child.stdout?.on('data',(data)=>{
            console.log('stdout: '+data);
        });
        child.stderr?.on('data',(data)=>{
            console.log('stderr: '+data);
        });

        child.on('close',()=>{
            resolve("");
        })
    })
} 