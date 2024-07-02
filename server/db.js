import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://oscarluty:J67lA0E9zlBFzCqb@arrierocluster.elbacgd.mongodb.net/arrierodb');
        console.log('Conectado a la base de datos en MongoDB Atlas');
    } catch (error) {
        console.log('Error al conectar a la base de datos:', error);
    }
}