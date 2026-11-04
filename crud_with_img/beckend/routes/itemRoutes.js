const express = require("express");
    const router = express.Router();
    const{
         createItem,
         getItem,
         getItemById,
         updateItem,
         deleteItem,

    }= require("../controllers/itemController")
    const {protect}= require("../middleware/authMiddleware")
    const upload = require("../middleware/uploadMiddleware");

//All item routes are protected by authmiddleware
router.use(protect);


//All item routes for items:
router.post("/", upload.single("image"), createItem);
router.get("/", getItem);
router.get("/:id", getItemById);
router.put("/:id", upload.single("image"), updateItem);
router.delete("/:id", deleteItem);


module.exports = router;