// const fs = require("fs").promises;

// // The async keyword lets us use "await" inside this function

// async function readNotes() {
//     console.log("Starting to read Files");

//     try {
//         const data = await fs.readFile("notes.txt", "utf-8");
//         console.log("File Content " + data);
//     } catch (error) {
//         console.log("Error" + error.message);
//     }
// }

// readNotes();
// console.log("This line runs before the file is finished reading");


const fs = require("fs").promises;

async function readNotes() {
    try {
        console.log("Reading Files");

        const data1 = await fs.readFile("notes.txt", "utf-8");
        console.log("notes.txt Content: " + data1);

        const data2 = await fs.readFile("promises.txt", "utf-8");
        console.log("promises.txt Content: " + data2);

    } catch (error) {
        console.log("Error: " + error.message);
    }
}

readNotes();
console.log("Program Continues");