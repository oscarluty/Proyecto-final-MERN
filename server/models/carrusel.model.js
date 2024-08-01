import mongoose from "mongoose";

const carruselSchema = new mongoose.Schema({
    imagen: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.model('Carrusel', carruselSchema);