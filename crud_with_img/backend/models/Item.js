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
        //store the item's image url
        image:{
            type:string,        //store the image url as text
            required:[true, "Item image URL is required"], //img=age urkl compulsory
        },
        //storeb tghe image unique public id fro cloudiary
        cloudinary_id:{
            type:String         //used to identify the image on cloudinary
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