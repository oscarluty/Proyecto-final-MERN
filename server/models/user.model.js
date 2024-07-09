import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: Number,
        required: true,
        min: 1000000,
        max: 99999999999,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rol',
        default: '6683672431d497510845d8cd'  // ID del rol 'cliente'
    }
}, {
    timestamps: true
})

export default mongoose.model('User', userSchema);