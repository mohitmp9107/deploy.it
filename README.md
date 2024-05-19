<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vercel Deployment Service</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0 20px;
            background-color: #f4f4f4;
        }
        header {
            background-color: #333;
            color: #fff;
            padding: 10px 0;
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2 {
            color: #333;
        }
        code {
            background: #eee;
            padding: 2px 4px;
            border-radius: 4px;
        }
        pre {
            background: #eee;
            padding: 10px;
            border-radius: 8px;
            overflow-x: auto;
        }
        .command {
            background: #333;
            color: #fff;
            padding: 2px 4px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Vercel Deployment Service</h1>
    </header>
    <div class="container">
        <p>This repository provides a one-click deployment solution for any kind of React code.</p>

        <h2>Backend Design</h2>
        <p>The backend is divided into three parts:</p>
        <ol>
            <li>
                <strong>vercel-upload-service (3000)</strong>: 
                Downloads code from a remote repository, uploads it to S3 storage, and places the request ID in a Redis queue.
            </li>
            <li>
                <strong>vercel-deploy-service</strong>: 
                A daemon service that continuously polls the Redis queue, builds the React code, and stores the HTML, CSS, and JS files back on AWS S3 storage.
            </li>
            <li>
                <strong>vercel-request-handler (3001)</strong>: 
                Pulls the compiled HTML, CSS, and JS from S3 and returns them to the browser.
            </li>
        </ol>

        <h2>Starting Redis Server</h2>
        <p>To start the Redis server, use the following command:</p>
        <pre><code class="command">sudo service redis-server start</code></pre>

        <h2>Redis CLI Commands</h2>
        <pre><code class="command">redis-cli</code></pre>
        <pre><code>127.0.0.1:6379> ping
PONG

127.0.0.1:6379> RPOP build-queue
"c846u"

127.0.0.1:6379> LPUSH build-queue yywbp/
(integer) 1</code></pre>

    </div>
</body>
</html>
