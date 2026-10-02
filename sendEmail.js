const nodemailer  = require("nodemailer");
  const transpoter  = nodemailer .createTransport({
    service: "gmail",
    auth: {
      user: "designohaseeb@gmail.com",
      pass: ""
    }
});
  const mailOptions = {
    from: "designohaseeb@gmail.com",
    to: "abdul_wadood@aptechnorth.edu.pk",
    subject: "Test Email",
    text: "This is a test email sent using Node.js and Nodemailer."
  };

  transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Somthing Went Wrong")
      console.log(error.message);
    } else {
        console.log("Email Send Successfully");
      console.log(info.response);
    }
});