import mongoose from "mongoose";

const uri: string = process.env.MONGO_DB_URI ?? '';

if (!uri) {
    throw new Error('MongoDB URI is missing');
}


let cached = (global as any).mongoose;

if (!cached) {
    cached = { conn: null, promise: null };
  }
if(!cached.conn){
    if(!cached.promise){
        const opts = {
            bufferCommands: true,
        };
        cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = cached.promise;
}

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'+ uri));
db.once('open', () => console.log('Connected to MongoDB'))

export default db;
