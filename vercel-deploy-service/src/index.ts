import { createClient,commandOptions } from "redis";
import { downloadS3Folder,copyFinalDist } from "./aws";
import { buildProject } from "./utils";
import { isObjectBindingPattern } from "typescript";

const subscriber = createClient();
subscriber.connect();

const publisher = createClient();
publisher.connect();

async function main(){
    // infinite running loop pulling id from redis queue
    console.log('starting infinite loop');
    while(1){
        const response = await subscriber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        // console.log(response);
        // @ts-ignore;
        const id = response.element;

        await downloadS3Folder(`output/${id}`);
        await buildProject(id);
        await copyFinalDist(id);
        publisher.hSet("status",id,"deployed");
    }
}

main();