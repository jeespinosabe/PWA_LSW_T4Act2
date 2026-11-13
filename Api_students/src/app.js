import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routeAPI from './api/v1/routes/index.js';

// FIC: Config para variables de entorno
import config from './config/config.js';

//  Establece la conexion a la BD
import { connectDB } from './config/database.config.js';
const app = express();

// FIC: Settings
app.set('port', config.PORT);

// FIC: Middlewares generales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Espera la conexión a la BD antes de atender cada petición (necesario en Vercel)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(503).json({ message: 'No se pudo conectar a la base de datos' });
    }
});

// FIC: Routes base
const api = config.API_URL;

app.get(`${api}`, (req, res) => {
    res.send(
        `<h1>RESTful running in root</h1> <p> eEducation: <b>${api}/api-docs</b> for more information.</p>`
    );
});

app.get('/DrFIC', (req, res) => {
    res.send(
        `<h1>RESTful running in ?</h1> <p> eEducation: <b>${api}/api-docs</b> for more information.</p>`
    );
});

// 🔥 IMPORTANTE (esto es lo nuevo del 6.4)
routeAPI(app);

export default app;