//require() loads a built in module, "http" lets us to build a web server
const http = require("http");

//CreateServer() takes a function that runs every time a request arrives
const server = http.createServer((req, res) => {
    res.statusCode = 200;        //200 means "ok", everything worked fine
    res.setHeader("Content-Type", "text/plain"); // tell the browser we are sending plain text
    res.end("Hello! This message came from my own Node.js Server");
});

//listen() start the server and tells it which port() to wait for
server.listen(5000, () => {
    console.log("Server is runnig. Visit http://localhost:5000 in your browser");
});
