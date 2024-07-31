import  Product  from "../models/product.model.js";
import multer from "multer";
import path from "path";
import { storage } from "../cloudinaryConfig.js";

const upload = multer({ storage: storage});

export const createProduct = async (req, res) => {
    console.log("Iniciando createProduct");
    upload.single('imagen')(req, res, async function (err) {
      if (err) {
        console.error("Error en upload:", err);
        return res.status(400).json({ message: "Error al subir el archivo", error: err.message });
      }
  
      try {
        console.log("Cuerpo de la solicitud:", req.body);
        console.log("Archivo subido:", req.file);
  
        const { nombre, descripcion, marca, categoria } = req.body;
        const imagen = req.file ? req.file.path : null;
  
        console.log("Datos a guardar:", { nombre, descripcion, marca, categoria, imagen });
  
        const newProduct = new Product({
          nombre,
          descripcion,
          imagen,
          marca,
          categoria
        });
  
        console.log("Modelo de producto creado:", newProduct);
  
        const savedProduct = await newProduct.save();
        console.log("Producto guardado:", savedProduct);
        res.json(savedProduct);
      } catch (error) {
        console.error("Error al guardar el producto:", error);
        res.status(500).json({ message: "Error al crear el producto", error: error.message });
      }
    });
  };

export const getProducts = async (req, res) => { 
    const products = await Product.find();
    res.json(products);  // Devuelve un array de productos en formato JSON  //
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

