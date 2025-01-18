import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

// IMPORT ROUTES =============================
import usersRouter from "./routes/users_routes.js";
import purchasesRouter from "./routes/purchases_routes.js";
import paymentsRouter from "./routes/payments_routes.js";

// SERVER CONFIG =============================
app.use(express.json());

// CORS OPTIONS =============================
const options = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175'
]

const corsOptions = {
  origin: (origin, callback) => {
    if(options.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES ====================================
app.use("/api/users", usersRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/purchases", purchasesRouter);

export default app;
