import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import upath from 'upath';
import 'dotenv/config';

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
})

export const downloadS3Folder = async (prefix:string)=>{
    console.log('downloading....');
    const allFiles = await s3.listObjectsV2({
        Bucket: "vercel-mohit",
        Prefix: prefix
    }).promise();

    const allPromises = allFiles.Contents?.map(async ({Key}) => {
        return new Promise(async (resolve) => {
            console.log(Key);
            if (!Key) {
                resolve("");
                return;
            }
            const finalOutputPath = path.join(__dirname.slice(0,-3), Key);

            const outputFile = fs.createWriteStream(finalOutputPath);
            const dirName = path.dirname(finalOutputPath);
            console.log(dirName);
            if (!fs.existsSync(dirName)){
                fs.mkdirSync(dirName, { recursive: true });
            }
            s3.getObject({
                Bucket: "vercel-mohit",
                Key
            }).createReadStream().pipe(outputFile).on("finish", () => {
                resolve("");
            })
        })
    }) || []
    // until all the files has been downloaded , function shouldn't return 
    await Promise.all(allPromises?.filter(x => x !== undefined));
};


export function copyFinalDist(id: string) {
    const folderPath = path.join(__dirname.slice(0,-3), `output/${id}/build`);
    const allFiles = getAllFiles(folderPath);
    // console.log(folderPath);
    allFiles.forEach(file => {
        uploadFile(`dist/${id}/`+file.slice(folderPath.length+1), file);
    })
}

const getAllFiles = (folderPath: string) => {
    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        if (fs.statSync(fullFilePath).isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath))
        } else {
            const unixFullFilePath = upath.toUnix(fullFilePath);
            console.log(unixFullFilePath);
            response.push(unixFullFilePath);
        }
    });
    return response;
}

const uploadFile = async (fileName: string, localFilePath: string) => {
    const fileContent = fs.readFileSync(localFilePath);
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel-mohit",
        Key: fileName,
    }).promise();
    console.log(response);
}