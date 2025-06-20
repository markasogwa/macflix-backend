import mongoose from "mongoose";
import app from "./app.js";
import { MONGODB_URI, PORT } from "./envConfig.js";

const port = PORT || 5000;
async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");

    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
}

startServer();

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("MongoDB disconnected. Server shutting down...");
  process.exit(0);
});
