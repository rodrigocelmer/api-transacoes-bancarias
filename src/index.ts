import express from 'express';
import { pgHelper } from './database/pg-helper';
import appRoutes from './routes';

const app = express();

app.use(express.json());
appRoutes(app);

pgHelper.connect()
.then(() => {
    app.listen(8080, () => console.log('Servidor iniciado'));
})
.catch((err) => console.log(err));