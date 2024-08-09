import mongoose from "mongoose";

const tipoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export default mongoose.model('Tipo', tipoSchema);