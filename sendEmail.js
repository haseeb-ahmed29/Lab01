// Google App Password
const nodemailer = require("nodemailer");

// ====================
// Step 1: Create the transporter
// The transporter is responsible for connecting
// our Node.js program to Gmail.
//
// Think of it as the "delivery system" for our email
const transporter = nodemailer.createTransport({
  service: "gmail",

  // Step 2: Gmail Authentication
  auth: {
    user: "muhammadshiraz2412c1@gmail.com",
    pass: "pnwk cewk fkmm owve",
  },
});

// Step 3: Create email
// ====================
//mailOptions tell nodemailer what email we want to send
const mailOptions={
    //Sender
    from:"muhammadshiraz2412c1@gmail.com",

    //receiver
    to:"syedrafay2212@gmail.com",

    //Email subject:
    subject: "Hello from my node.js server",

    //Email body:
    text: "This email was sent by automatically by a script"
}

//Step 4: Send the email:
transporter.sendMail(mailOptions, (error, info)=>{
    // if there is an error
    if(error){
        console.log("Something went wrong");
        console.log(error.message);
    }
    //If email was successfully sent
    else{
        console.log("Email sent successfully");
        console.log(info.response);
    }
})
