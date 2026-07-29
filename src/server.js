import http from "http";
import app from "./app.js";
import { initSocket } from "./socket.js";
import { connectToDatabase } from "./config/db.js";

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    console.log("MongoDB Connected");
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  });
