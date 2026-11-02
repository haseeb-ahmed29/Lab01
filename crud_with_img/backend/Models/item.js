const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,       //Name must be text
            required: [true, "Item name is required"],  //Name is compulsory
            //Example: Remove extra space from the beginning and end:
            //Ali --->     Ali
            trim: true
        },
        description:
        {
            type: String,       //Name must be text
            required: [true, "Item description is required"],  //Name is compulsory
            //Example: Remove extra space from the beginning and end:
            trim: true
        },
        //Store the item's image URL
        image:{
            type: String,      //Store the image URL as text
            required:[true, "Item image URL is required"],    //Image URL complsory
        },
        //Store the image's unique public ID from Cloudinary
        Cloudinary_id:{
            type:String           //Used to identify the image on Cloudinary
        },
        //Connect this item to the user who created it.
        user:{
            //Store the users MongoDB ID
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,     // Every item must belong to a user
        },
    },
    //Automatically add createdAt and updatedAt fields
    {
        timestamps: true,
    }
)
module.exports = mongoose.model("Item", itemSchema);
            

