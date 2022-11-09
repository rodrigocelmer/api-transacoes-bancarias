import { Express } from "express";
import { TransactionController } from "./controllers/TransactionController";
import { UserController } from "./controllers/UserController";
import { TransactionMiddleware } from "./middlewares/TransactionMiddleware";
import { UserMiddleware } from "./middlewares/UserMiddleware";

export default (app: Express) => {
    app.get('/', (request, response) => response.send('OK'));

    app.post(
        '/users', 
        new UserMiddleware().validateUserBody,
        new UserMiddleware().validateCpf,
        new UserController().create
    );
    app.get(
        '/users/:userId', 
        // new UserMiddleware().validateUserId, 
        new UserController().getById
    );
    app.get(
        '/users', 
        new UserController().getAll
    );
    app.delete(
        '/users/:userId', 
        new UserMiddleware().validateUserId, 
        new UserController().remove
    );
    app.put(
        '/users/:userId',
        new UserMiddleware().validateUserId, 
        new UserMiddleware().validateUserBody,
        new UserMiddleware().validateCpf,
        new UserController().update
    );
    app.post(
        '/users/:userId/transactions', 
        new UserMiddleware().validateUserId, 
        new TransactionMiddleware().validateTransBody,
        new TransactionController().create
    );
    app.get(
        '/users/:userId/transactions/:transId',
        new UserMiddleware().validateUserId,
        new TransactionMiddleware().validateTransId,
        new TransactionController().getById
    );
    app.get(
        '/users/:userId/transactions',
        new UserMiddleware().validateUserId,
        new TransactionController().getAll
    );
    app.delete(
        '/users/:userId/transactions/:transId',
        new UserMiddleware().validateUserId,
        new TransactionMiddleware().validateTransId,
        new TransactionController().remove
    );
    app.put(
        '/users/:userId/transactions/:transId',
        new UserMiddleware().validateUserId,
        new TransactionMiddleware().validateTransId,
        new TransactionMiddleware().validateTransBody,
        new TransactionController().update
    );
}