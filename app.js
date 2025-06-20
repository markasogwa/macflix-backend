import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { CLIENT_URL } from "./envConfig.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import favoriteRoute from "./routes/favoriteRoute.js";
import movieRoutes from "./routes/movieRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import reviewsRoutes from "./routes/reviewsRoute.js";
import userRoutes from "./routes/userRoutes.js";
import watchlistRoute from "./routes/watchlistRoute.js";

const app = express();

const allowedOrigins = [CLIENT_URL];

// ✅ Use CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// These two lines are required when using ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Serve uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/favorite", favoriteRoute);
app.use("/api/watchlist", watchlistRoute);

app.use(errorHandler);

export default app;
// Export the app for use in other modules
