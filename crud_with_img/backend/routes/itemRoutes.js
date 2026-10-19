const express = require("express");
const router = express.Router();
const {
    createItem,
    getItems,
    getItemsById,
    updateItem,
    deleteItem,
} = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// All item routes are protected by authMiddleware
router.use(protect);

// // Routes
// router.route("/").get(getItems).post(upload.single("image"), createItem);
// router.route("/:id").get(getItemsById).put(upload.single("image"), updateItem).delete(deleteItem);

module.exports = router;