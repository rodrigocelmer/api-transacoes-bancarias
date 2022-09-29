import { NextFunction, Request, Response } from "express";
import { usersDB } from "../db/users";

export class TransactionMiddleware {
    validateTransId(request: Request, response: Response, next: NextFunction){
        const {userId, transId} = request.params;
        const user = usersDB.find(u => u.id === userId);
        const transaction = user?.transactions.find(t => t.id === transId);

        if(!transaction){
            return response.status(404).json({err: 'transaction not found'});
        }

        return next();
    }
}