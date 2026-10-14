//Import Node.js buil in eventEmitter module
//eventEmitter allows us to create and handle custom events
const EventEmitter = require("events")

//Create a new EventEmitter object
const orderEvent = new EventEmitter()

//on() = event ko listen krna
orderEvent.on("orderPlaced",(item)=>{
    console.log("New order received for"+ item);
})

orderEvent.on("orderPlaced",(item)=>{
    console.log("Sending Confirmation email about"+ item);
})

//emit (trigger) the "orderplaced" event
orderEvent.emit("orderPlaced", "Blue sneakers")
