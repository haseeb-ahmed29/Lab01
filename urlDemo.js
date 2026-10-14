// Import Node.js built in HTTP Module.
//It is used to create an HTTP web server
const http = require("http")


//Import built in URL module
//It helps us read and understand URL and query parameters
const url = require("url")


//Create the HTTP server
//function that runs every time a client/browser sends a request
const server = http.createServer((req, res)=>{
    //Convert the requested URL into parsed objects
    //true means we also want to parse the query parameters
    const parsedUrl = url.parse(req.url,true)
    res.setHeader("Content-Type", "text/plain")


    //Send a response back to the browser
   //JS object to convert into JSON string/text
res.end(
    "Path requested: " + parsedUrl.pathname+"\n"+
    "Query Data:" + JSON.stringify(parsedUrl.query)
)
})

server.listen(3000, ()=>{
    // ? --> query data start
    // & --> next query parameter
    // = --> parameter value
    //Display as the URL in the terminal so we know how to test the browser
    console.log("Try visiting  http://localhost:3000/search?item=shoes&size=7");
})

