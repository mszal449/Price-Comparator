import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    const collections = await mongoose.connection.db?.collections();
    if (collections) {
      collections.forEach((collection) =>
        console.log(collection.collectionName),
      );
    }
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
