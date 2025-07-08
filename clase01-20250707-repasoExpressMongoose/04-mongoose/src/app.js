import express from 'express';
import { UsuariosManager } from './dao/UsuariosManager.js';
import { logger } from './middleware/log.js';
import { auth } from './middleware/auth.js';
import { router as usuariosRouter } from './routes/usuariosRouter.js';
import { router as clientesRouter } from './routes/clientesRouter.js';
import { conectarDB } from './config/db.js';
import { config } from './config/config.js';
// import { usuarios } from './data/usuarios.js';
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))
app.use(logger)

app.use("/api/usuarios", usuariosRouter)
app.use("/api/clientes", clientesRouter)

app.get('/', (req, res) => {

    // res.setHeader('Content-Type','text/plain');
    // res.status(200).send('OK');
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "OK" });
})

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

conectarDB(
    config.MONGO_URL,
    config.DB_NAME
)