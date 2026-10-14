const fs = require("fs").promises;

// The async keyword lets us use "await" inside this function

async function readNotes() {
    console.log("Reading Files");

    try {
        const data = await fs.readFile("promises.txt", "utf-8");
        console.log("File Content : " + data);
    } catch (error) {
        console.log("Error" + error.message);
    }
}

readNotes();
console.log("Program Continues");