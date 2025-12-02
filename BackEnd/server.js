require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const requestIp = require("request-ip");
const { lookup } = require("ip-location-api");
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const trackingRoutes = require("./routes/tracking");
const UserRouter = require("./routes/user");
const initializeSocket = require("./socket");
const User = require("./models/User");

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
  // const clientIp = requestIp.getClientIp(req);
  // var ip = "192.168.131.206";
  // var location = await lookup(ip);
  res.send("location nothing");
  // next();
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

<<<<<<< HEAD
=======

>>>>>>> b233fd798780f72cd5750af9ae801b3fda6b98e7
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
