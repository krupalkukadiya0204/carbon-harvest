import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the provided URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Configuration options to avoid deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log a message to the console when successfully connected
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during connection, log the error message
    console.error(`Error: ${error.message}`);

    // Exit the process with failure code (1)
    process.exit(1);
  }
};

// Export the connectDB function to be used in other parts of the application
export default connectDB;