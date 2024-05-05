import express from "express";
import "../dotenv.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";

// Importacion del Routedor
import router from "../routes/book.routes.js";

export const startServer = (option) => {
  // Car ga de la Libreria para automatizar el HTTP
  const app = express();

  // Carga de MiddleWare
  app.use(bodyParser.json());

  // Conexion con la base de Datos
  mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME,
  });

  // Carga de ruta en el Servidor
  app.use("/", router);

  // Puerto de Escucha
  const Port = process.env.PORT ?? option.Port;
  app.listen(Port, () => {
    console.log(`El servidor está corriendo en http://localhost:${Port}`);
  });
};
