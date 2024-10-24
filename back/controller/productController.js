const Product = require("../model/product");


exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'category responsable');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'category responsable');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createProduct = async (req, res) => {
    const product = new Product({
        product: req.body.product,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.product = req.body.product || product.product;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.stock = req.body.stock || product.stock;
        product.category = req.body.category || product.category;

        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


