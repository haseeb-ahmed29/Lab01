// Node JS VS Express js difference:

// Node JS is an engine = Ek runtime environment hai, jo only browser chalta hai
// Express JS = Us engine se bani hui car ki body hai
// Express JS = Ek web framework hai, means Node JS ke upar bana hua easy wala package

const express = require("express");
// Creates an express application
const app = express();

// app.get() handle GET request
// (the kind of info that is shown in the browser sends when
// the user visits the page)

app.get("/", (req, res) => {
    res.send("Welcome to my Express Server");
})

app.get("/about", (req, res) => {
    res.send("This server uses the express.js Framework");
})

//:name is route parameter - a placeholder than can match many different values
app.get("/greet/:name",(req,res)=>{
    res.send("Hello"+req.params.name+" ! Nice to meet you.")
})

app.listen(3000, () => {
    console.log("Express server running at http://localhost:3000");
});


// taskkill /F /IM node.exe