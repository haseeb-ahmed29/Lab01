const fs = require("fs").promises;

console.log("Reading Files");

fs.readFile("notes.txt", "utf-8")
    .then((data) => {
        // File successfully read
        console.log(data);
    })
    .catch((error) => {
        console.log("Error" + error.message);
    });

console.log("Program Continues...");