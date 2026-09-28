const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    res.setHeader("Content-Type", "text/plain");

    //Send a response back to the broweser
    //JS object to convert into JSON string/text
    res.end(
        "Path requested:" + parsedUrl.pathname + "\n" +
        "Query Data:" + JSON.stringify(parsedUrl.query)
    );
});

server.listen(3000, () => {
    // ? --> query data start
    // & --> next query parameter
    // = --> parameter value
    //Display as the URL in the terminal so we know how to test the browser
    console.log("Try visiting http://localhost:3000/search?item=shoes&size=7");
});
