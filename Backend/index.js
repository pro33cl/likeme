// ----------------------------------------------------------
// IMPORTANDO
// ----------------------------------------------------------

import express from 'express';
import cors from 'cors';
import "dotenv/config";
import postsRoute from "./routes/posts.route.js";

// ----------------------------------------------------------
// DECLARACION DE VARIABLES
// ----------------------------------------------------------

const app = express();
const SERVER = "http://localhost";
const PORT = process.env.PORT || 3000;

// ----------------------------------------------------------
// MIDDLEWARES
// ----------------------------------------------------------

app.use(express.json());
app.use(cors());
app.use("/posts", postsRoute);

// ----------------------------------------------------------
// LEVANTAR SERVIDOR
// ----------------------------------------------------------

app.listen(PORT, ()=>{
    console.log(`SERVER BACKEND ON, PORT: ${PORT}`)
    console.log(`Server: ${SERVER}:${PORT}`)
});