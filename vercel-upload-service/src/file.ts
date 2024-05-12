import fs from "fs";
import path from "path"
import { formatDiagnostic } from "typescript";

export const getAllFiles = (folderPath: string)=>{
    console.log(folderPath);
    let response:string[] = [];

    const fileAndFolders = fs.readdirSync(folderPath);

    fileAndFolders.forEach(file =>{
        const fullAbsolutePath = path.join(folderPath,file);
        // console.log(folderPath);
        // console.log(file);
        if(fs.statSync(fullAbsolutePath).isDirectory()){
            response = response.concat(getAllFiles(fullAbsolutePath));
        }else{
            response.push(fullAbsolutePath);
        }
    })
    return response;
}