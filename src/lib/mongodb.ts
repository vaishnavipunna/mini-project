import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not set in environment");
}

type Cached = {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
};

// Use globalThis to preserve cache across module reloads (useful in dev)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalWithMongoose = globalThis as any;
if (!globalWithMongoose._mongooseCache) {
  globalWithMongoose._mongooseCache = { conn: null, promise: null } as Cached;
}
const cached: Cached = globalWithMongoose._mongooseCache;

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("[mongodb] attempting connection to MongoDB Atlas");
    // ensure URI is a string for mongoose.connect typing
    const uri = String(MONGODB_URI);
    cached.promise = mongoose
      .connect(uri)
      .then((m) => m)
      .catch((err) => {
        // reset so future attempts can retry
        cached.promise = null;
        console.error("[mongodb] connection error:", err instanceof Error ? err.message : String(err));
        throw err;
      });
  }

  cached.conn = await cached.promise;
  console.log("[mongodb] successfully connected to database");
  return cached.conn;
}
