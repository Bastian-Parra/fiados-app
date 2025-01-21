import app from "./app.js";
import { connectDB, sequelize } from "./config/database.js";
import { createServer } from "http"
import http from "http"
import { Server as SocketServer} from "socket.io"

const PORT = process.env.PORT || 3000;

// create http server
const server = http.createServer(app)

// config socket.io
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  }
})

io.on("connection", (socket) => {
  console.log("Nueva conexión", socket.id);

  socket.on("disconnect", () => {
    console.log("Conexión finalizada", socket.id);
  });
})


// connect database
connectDB()
  .then(() => {
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Los modelos han sido sincronizados con la base de datos.");

    server.listen(PORT, () => {
      console.log(`El server está corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

export {  io};
