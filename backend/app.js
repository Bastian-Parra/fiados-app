import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

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

const _dirname = path.resolve()

app.use(express.static(path.join(__dirname, "dist")))
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "dist", "index.html"))
})

export default app;
