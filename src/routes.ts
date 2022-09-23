import { Express } from "express";
import { UserController } from "./controllers/UserController";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));
    app.post('/users', new UserController().create);
    app.get('/users/:id', new UserController().getById);
    app.get('/users' , new UserController().getAll);
}