import mongoose from "mongoose";

let cachedConnection = null;

export const connectToDatabase = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    cachedConnection = mongoose.connection;
    return cachedConnection;
  }

  if (mongoose.connection.readyState === 2) {
    await mongoose.connection.asPromise();
    cachedConnection = mongoose.connection;
    return cachedConnection;
  }

  await mongoose.connect(mongoUri);
  cachedConnection = mongoose.connection;
  return cachedConnection;
};
