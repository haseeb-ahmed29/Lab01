console.log("This files lives in " + __dirname);

console.log("Message:1 This prints first");

setTimeout(()=>{
    console.log("Message:3 This prints after 5 seconds delay.");
}, 500)

console.log("Message:2 This prints second right away.");