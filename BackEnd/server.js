require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const trackingRoutes = require("./routes/tracking");
const WebsiteRouter = require('./routes/WebsiteOwnerOTP')
const UserRouter = require("./routes/user");
const queryRoutes = require("./routes/Query");
const initializeSocket = require("./socket");


const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);

app.set("trust proxy", true);

app.use(helmet());
app.use(cors());

app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.set("trust proxy", true);

const io = initializeSocket(server);
app.set("io", io);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.get("/", async (req, res) => {
  res.send("Dev Trace APIs Working Fine");

});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", UserRouter);
app.use('/api/website',WebsiteRouter)
app.use('/api/query',queryRoutes)
app.use("/api", projectRoutes);
app.use("/api", trackingRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  });
});

module.exports = { app, server };
