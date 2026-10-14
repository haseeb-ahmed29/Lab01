
const fs = require("fs").promises;

// fs is a file-system built-in module for reading and writing files
// The promises version of fs returns Promises instead of using Callback

console.log("Starting to read files...");

fs.readFile("promises.txt", "utf8")
    .then((data) => {
        console.log("File Content : " + data);
    })
    .catch((error) => {
        console.log("Could not read File" + error.message);
    });

console.log("This line runs before the file is finished reading");