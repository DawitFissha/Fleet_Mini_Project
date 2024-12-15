import mongoose from 'mongoose';
const connectDB = async (): Promise<void> => {
  try {
    const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://dawitfissha1:YCizIhZ8X2e8dckK@cluster0.ij2pi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
