//fs = file-system, built in module for reading and writing files

// const { error } = require("console");
const fs = require("fs")

console.log("Starting to read file...");

// readfile() is a asynchronous:
fs.readFile("notes.txt", "utf-8", (error,data)=>{
    if(error){
        console.log("Could not read file"+error.message);
        return;
    }
    console.log("File Content"+data);
})

console.log("This line runs before the file is finished reading");
