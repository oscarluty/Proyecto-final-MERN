import  Product  from "../models/product.model.js";

export const getProducts = async (req, res) => { 
    const products = await Product.find();
    res.json(products);  // Devuelve un array de productos en formato JSON  //
};

export const createProduct = async (req, res) => { 
    const { nombre, descripcion, imagen, marca, subcategoria } = req.body;
    const newProduct = new Product({ 
        nombre, 
        descripcion, 
        imagen, 
        marca, 
        subcategoria 
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);  // Devuelve el producto creado en formato JSON  //
};

export const getProduct = async (req, res) => { 
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({message: 'Product not found'})
    res.json(product);  // Devuelve el producto en formato JSON  //  //
};

export const deleteProduct = async (req, res) => { 
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({message: 'Product not found'})
    return res.sendStatus(204);  // Devuelve el producto eliminado en formato JSON  //  //  //
};

export const updateProduct = async (req, res) => { 
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({message: 'Product not found'})
    res.json(product);  // Devuelve el producto actualizado en formato JSON  //  //  //
};

