import { Express } from "express";
import { TransactionController } from "./controllers/TransactionController";
import { UserController } from "./controllers/UserController";
import { TransactionMiddleware } from "./middlewares/TransactionMiddleware";
import { UserMiddleware } from "./middlewares/UserMiddleware";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));
    app.post('/users', new UserController().create);
    app.get('/users/:id', new UserController().getById);
    app.get('/users' , new UserController().getAll);
    app.delete('/users/:id', new UserController().remove);
    app.put(
        '/users/:id',
        new UserMiddleware().validateUpdateUser,
        new UserController().update
    );
    app.post(
        '/users/:userId/transactions', 
        new UserMiddleware().validateUserId, 
        new TransactionController().create
    );
    app.get(
        '/users/:userId/transactions/:transId',
        new UserMiddleware().validateUserId,
        new TransactionMiddleware().validateTransId,
        new TransactionController().getById
    );
}