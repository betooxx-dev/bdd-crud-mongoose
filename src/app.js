import express from "express";
import morgan from "morgan";
import cors from "cors";
import { config } from "dotenv";

import usuarioRoutes from "./routes/usuario.routes.js";
import publicacionRoutes from "./routes/publicacion.routes.js";
import comentarioRoutes from "./routes/comentario.routes.js";

const app = express();

config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


app.use("/api", usuarioRoutes);
app.use("/api", publicacionRoutes);
app.use("/api", comentarioRoutes);

export default app;