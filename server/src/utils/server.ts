import cors from "cors";
import express, { Request } from "express";
import deserializeUser from "../middleware/deserializeUser";
import routes from "../routes";
import cookieParser from "cookie-parser";
import cloudinaryConfig from "../config/cloudinary";

function createServer() {
  const app = express();

  app.use(
    cors({
      origin: process.env.ORIGIN,
      preflightContinue: true,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: [
        "x-access-token",
        "x-refresh-token",
        "authorization",
        "Content-Type",
        "X-New-Access-Token",
      ],
      exposedHeaders: "X-New-Access-Token",
    })
  );

  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(deserializeUser); // to add the user to the req object

  cloudinaryConfig();
  routes(app);
  console.log("routes", routes);
  return app;
}

export default createServer;
