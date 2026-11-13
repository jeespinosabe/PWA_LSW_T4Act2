import mongoose from 'mongoose';
import config from './config.js';
export default mongoose;

let connecting = null;

export const connectDB = async () => {
    if (mongoose.connection.readyState === 1) return mongoose.connection;
    if (!connecting) {
        connecting = mongoose
            .connect(config.CONNECTION_STRING, {
                dbName: config.DATABASE,
                serverSelectionTimeoutMS: 8000,
            })
            .then((db) => {
                console.log('✅ Database is connected to: ', db.connection.name);
                return db.connection;
            })
            .catch((error) => {
                connecting = null;
                console.log('❌ Error de conexión: ', error.message);
                throw error;
            });
    }
    return connecting;
};

connectDB().catch(() => {});
