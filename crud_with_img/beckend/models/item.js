const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    name: {
        type: String,     // item ust be text.
        required: [true, "Please add a name"],  /// Name is compulsory.
        //example: Remove extra spaces, special characters, and numbers from the name field. Only allow letters and spaces for the begining  and  end
         //Ali --->
         trim: true,  



    },
    description:
     {
        type: String,   //Name must be text.
        required: [true, "The  description is required"],  //Description is compulsory.
        //Example: remove extra space from the begining and end.:
        trim: true,

     },
     //Store the  items = image url
        image: {
            type: String,
            required: [true, "Please add an image"],   //Image Url  compulsory

        },
        //Store the images unique public id from cloudinary
        cloudinary_id: {
            type: String,     ///used to identify the image on cloudinary

        },
        //Connect the item to the user who created it

        user: {
            type: mongoose.Schema.Types.ObjectId,  //Reference to the user model
            required: true,   //User is compulsory
            ref: "User",      //Reference to the User model
        },
    },
    //Automatically add createdAt and updatedAt fields
    {
        timestamps: true
    
    }
)
module.exports = mongoose.model("Item", itemSchema);

     
     