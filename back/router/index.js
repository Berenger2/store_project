const express = require("express");
const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("../controller/productController");
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require("../controller/categoryController");
const router = express.Router();


router.get("/", (req, res) => {
    res.send("Welcome to the API");
});


router.get("/products", getAllProducts);
router.get("/product/:id",getProductById);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

router.get("/categories", getAllCategories);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);


module.exports = router;