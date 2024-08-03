import mongoose from "mongoose";

export async function connect() {    
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully!');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error: ', err);
            process.exit();
        })
    } catch (error: any) {
        console.log('Something goes wrong!', error);
        throw new Error(error);
    }
}