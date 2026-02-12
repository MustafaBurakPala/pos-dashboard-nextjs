import mongoose from "mongoose";

const globalForMongoose = global as unknown as {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI; // ✅ burada oku

  if (!MONGODB_URI) {
    // ✅ hata sadece gerçekten dbConnect çağrılınca gelsin
    throw new Error("MONGODB_URI tanımlı değil!");
  }

  if (globalForMongoose.mongoose!.conn) {
    return globalForMongoose.mongoose!.conn;
  }

  if (!globalForMongoose.mongoose!.promise) {
    globalForMongoose.mongoose!.promise = mongoose.connect(MONGODB_URI);
  }

  globalForMongoose.mongoose!.conn = await globalForMongoose.mongoose!.promise;
  return globalForMongoose.mongoose!.conn;
}
