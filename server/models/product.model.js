import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    marca: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Marca',
        required: true,
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoria',
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema);