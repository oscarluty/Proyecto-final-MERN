import mongoose from "mongoose";

const rolSchema = new mongoose.Schema({
    rol: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Rol', rolSchema, 'rol');