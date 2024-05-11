require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const winston = require("winston");

const dataController = require("./controllers/dataController");
const authenticateToken = require("./middlewares/authenticationMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");
const apiLimiter = require("./middlewares/rateLimitMiddleware");
const firebaseService = require("./services/firebaseService");
const logger = require("./utils/logger");

const app = express();
let port = process.env.PORT || 3000;

const logsDirectory = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const accessLogStream = fs.createWriteStream(
  path.join(logsDirectory, "access.log"),
  { flags: "a" }
);
const errorLogStream = fs.createWriteStream(
  path.join(logsDirectory, "error.log"),
  { flags: "a" }
);

const loggerWinston = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDirectory, "error.log"),
      level: "error",
    }),
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.Stream({ stream: accessLogStream }),
  ],
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());

const firebaseApp = firebaseService.initializeFirebaseApp({
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
});

app.get("/", (req, res) => {
  res.send(
    `Halo, ini adalah API Soltarine. Silahkan kunjungi <a href="/api/data">/api/data</a> untuk mendapatkan data`
  );
});

app.get("/api/data", apiLimiter, dataController.getData);
app.put("/api/data", apiLimiter, authenticateToken, dataController.updateData);

app.use(errorMiddleware);

const server = app.listen(port, () => {
  logger.info(
    `API ${process.env.APP_NAME} berjalan di http://localhost:${port}`
  );
  logger.info("Gunakan CTRL + C untuk menghentikan server.");
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    logger.info(`Port ${port} sudah digunakan, mencoba port berikutnya...`);
    port++;
    server.listen(port);
  } else {
    logger.error("Terjadi kesalahan:", err);
  }
});

process.on("SIGINT", () => {
  logger.info("Server sedang dihentikan...");
  server.close(() => {
    logger.info("Server telah dihentikan.");
    process.exit(0);
  });
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
