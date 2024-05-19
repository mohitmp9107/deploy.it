This repo deploys any kind of React code in single click.

Whole backend design is split into 3 parts.

vercel-upload-service (3000) -> download code from remote repo , upload back on S3 storage and put this req id in redis queue.

vercel-deploy-service() -> A daemon service continuously polling the redis queue , then build react code , store back the html,css,js files on AWS S3 storage.

vercel-request-handler(3001) -> it will pull compiled html,css & Js from S3 and return back to browser.

Start Redis server
sudo service redis-server start

redis-cli
127.0.0.1:6379> ping
PONG

127.0.0.1:6379> RPOP build-queue
"c846u"

127.0.0.1:6379> LPUSH build-queue yywbp/
(integer) 1