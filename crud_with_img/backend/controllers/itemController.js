const mongoose = require("mongoose");

const Item = require("../models/Item")

const cloudinary = require("../config/cloudinary")

//Helper function to upload an in-memory to Cloudinary using Data URI:
const uploadImageToCloudinary = async(file)=>{
    //Convert the image buffer into a Base64 string
    const b64 = Buffer.from(file.buffer).toString("base64");

    //Creates  a Data URI containing the image type and Base64 data
    //file.mimetype --> image ka type batado, jaise image/png, ya image/jpeg
    const dataURI = `data:${file.mimetype};base64,${b64}`

    //Upload the image to the "mern_items" folder in Cloudinary
    const result = await cloudinary.uploader.upload(dataURI,{
        folder: "mern_items",
    })

    //Return the upload result, including the image URL
    return result
}

//Create a new item
//route POST/api/items

const createItem = async(req, res)=>{
    try{
        const{name, description} = req.body;

        //validate required text fields:
        if(!name || !description){
            return res.status(400).json({message: "Item name and description are required."})
        }

        //validate required image file:
        if(!req.file){
            return res.status(400).json({message: "Item image is required."})
        }

        //Upload image to Cloudinary:
        const cloudinaryResult = await uploadImageToCloudinary(req.file)

        //Create item in MongoDB:
        const newItem = await Item.create({
            name,
            description,
            image: cloudinaryResult.secure_url,
            cloudinary_id: cloudinaryResult.public_id,
            user: req.user._id,
        })
        return res.status(201).json({
            message: "Item Created Successfully",
            item: newItem
        })
        }catch(error){
            console.error("Create Item Error:", error.message);
            return res.status(500).json({message: error.message || "Failed to create item"})
        }
    }

    //Get all items for the logged in user:
        const getItems = async(req, res)=>{
            try{
                //Only return items belonging to the authenticated user
                const items = await Item.find({user: req.user._id}).sort({createdAt: -1})

                return res.status(200).json(items)
            }catch(error){
                console.error("Get Item Error:", error.message);
                return res.status(500).json({message: "Failed to fetch item"})
            }
        }

        //Get single item by ID:
const getItemById = async(req, res)=>{
    try{
        const {id} = req.params;

        //Validate MongoDB objectId
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid item ID:"})
        }

        const item = await Item.findById(id);

        if(!item){
            return res.status(404).json({message: "Item not found:"})
        }

        //Ensure only the owner can access the item
        if(item.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "Not authorized to access this item"})
        }

        return res.status(200).json(item);
    }catch(error){
        console.error("Get Item by ID Error:", error.message);
        return res.status(500).json({message: "Failed to fetch item"})
    }
}

//Update an item:
//PUT /api/item/:id
const updateItem = async(req, res)=>{
    try{
    const {id} = req.params;
    const {name, description} = req.body;

    //Validate MongoDB objectId
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid item ID:"})
    }

    const item = await Item.findById(id);

    if(!item){
        return res.status(404).json({message: "Item not found:"})
    }

    //Ensure only the owner can access the item
    if(item.user.toString() !== req.user._id.toString()){
        return res.status(403).json({message: "Not authorized to update this item"})
    }

    //Update text fields if provided
    if(name) item.name = name;
    if(description) item.description = description;

    //If user uploaded a new image, replace old image in Cloudinary
    if(req.file){
        if(item.cloudinary_id){
            try{
                await cloudinary.uploader.destroy(item.cloudinary_id);
            }catch(cleanupError){
                console.warn("Could not delete previous image from Cloudinary", cleanupError.message)
            }
        }
    

const cloudinaryResult = await uploadImageToCloudinary(req.file);
item.image = cloudinaryResult.secure_url;
item.cloudinary_id = cloudinaryResult.public_id;

}
const updatedItem = await item.save();


return res.status(200).json({
    message: "Item updated successfully",
    item: updatedItem,
});
}catch(error){
    console.error("Update Item Error:", error.message);
    return res.status(500).json({message: error.message || "Failed to update item"})
};
}

//Delete an item:
//Delete/api/item/:id
const deleteItem = async(req, res)=>{
    try{
        //Validate MongoDB ObjectId
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid item ID:"})
        }

        const item = await Item.findById(id);

        if(!item){
            return res.status(404).json({message: "Item not found:"})
        }

        //Ensure only the owner can access the Item
        if(item.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "Not authorized to delete this item"})
        }

        //Delete image from Cloudinary if it exists
        if(item.cloudinary_id){
            try{
                await cloudinary.uploader.destroy(item.cloudinary_id);
            }catch(cleanupError){
                console.warn("Could not delete image from Cloudinary", cleanupError.message)
            }
        }

        await Item.findByIdAndDelete(id);
        return res.status(200).json({message: "Item deleted Successfully"})
    }catch(error){
        console.error("Delete Item Error:", error.message);
        return res.status(500).json({message: error.message || "Failed to delete item"})
    }
}

module.exports = {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
};