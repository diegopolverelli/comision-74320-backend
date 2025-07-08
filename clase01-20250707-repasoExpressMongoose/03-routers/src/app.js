import express from 'express';
import { UsuariosManager } from './dao/UsuariosManager.js';
import { logger } from './middleware/log.js';
import { auth } from './middleware/auth.js';
import { router as usuariosRouter } from './routes/usuariosRouter.js';
import { router as clientesRouter } from './routes/clientesRouter.js';
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


// app.get('/api/usuarios/', (req, res) => {
//     // usuarios
//     let usuarios = UsuariosManager.get()

//     res.setHeader('Content-Type', 'application/json');
//     return res.status(200).json({ payload: usuarios });
// })

// app.post('/api/usuarios/', auth, (req, res) => {
//     let { nombre, email } = req.body
//     if (!nombre || !email) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({ error: `nombre / email son requeridos` })
//     }

//     // resto validaciones pertinentes
//     try {

//         let nuevoUsuario = UsuariosManager.create({ nombre, email })

//         res.setHeader('Content-Type', 'application/json');
//         return res.status(201).json({ payload: nuevoUsuario, message: `Usuario generado con éxito` });
//     } catch (error) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(500).json({ error: `Error interno del servidor` })
//     }

// })

// app.delete(
//     "/api/usuarios/:id",
//     auth,
//     // logger,
//     (req, res) => {
//         // let id=req.params.id
//         let { id } = req.params

//         res.setHeader('Content-Type', 'application/json');
//         return res.status(200).json({ payload: `Se eliminó el usuario con id ${id}` });
//     }
// )

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});
