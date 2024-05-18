vercel-upload-service (3000) -> download code from remote repo , upload back on S3 storage and put this req id in redis queue.

vercel-deploy-service() -> A daemon service infinitely running in loop pulling anything from the redis queue , then build react code , store back the html,css,js files on S3 .

vercel-request-handler(3001) -> it will pull compiled html,css & Js from S3 and return back to browser.