require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectDB = require("./configs/db");

// 1. Connect Database
connectDB();

// 2. Tạo HTTP server (quan trọng nếu dùng socket sau này)
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// 3. Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// 4. Handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

// 5. Handle uncaught exception
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});

// 6. Graceful shutdown (Ctrl + C)
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down server...");
  await require("mongoose").connection.close();
  process.exit(0);
});