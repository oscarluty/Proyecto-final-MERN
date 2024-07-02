import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
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