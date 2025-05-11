import mongoose, { Connection, ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URI!
const MONGODB_NAME = process.env.DATABASE_NAME!

if (!MONGODB_URI || !MONGODB_NAME) {
  throw new Error('Please define the MONGODB_URI and MONGODB_NAME environment variable inside .env')
}

interface Cached {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  var mongoose: Cached;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose.connection)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export { connectDB } 