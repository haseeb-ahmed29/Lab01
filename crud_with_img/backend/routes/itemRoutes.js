const express = require("express");
const router = express.Router();
const{
    createItem,
    getItems,
    getItemsbyId,
    updateItem,
    deleteItem,

} = require("../controllers/itemController")
const {protect} = require("../middleware/authMiddleware")
const upload = require("../middleware/uploadMiddleware");

//All item routes are protected by authMiddleware
router.use(protect);

//CRUD routes for items
router.post("/", upload.single("image"),createitem);
router.get("/",getItems);
router.get("/:id",getItemsById),
router.put("/", upload.single("image"),updateItem);
router.delete("/:id", deleteItem)

module.exports = router;