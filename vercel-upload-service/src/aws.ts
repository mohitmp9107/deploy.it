import AWS from 'aws-sdk'
import fs from "fs";
import 'dotenv/config';

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})
// fileName: output\wvlex\src\utils\users.js
// filePath: C:\Users\Mohit\Desktop\My_Projects\vercel\output\wvlex\src\utils\users.js
export const uploadFile = async (fileName:string , localFilePath:string)=>{
    // console.log('uploadFile s3');
    const fileContent = fs.readFileSync(localFilePath);
    console.log(fileName);
    console.log(localFilePath);
    const response = await s3.upload({
        Body:fileContent,
        Bucket:"vercel-mohit",
        Key:fileName,
    }).promise();
}