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

    validateTransBody(request: Request, response: Response, next: NextFunction){
        const {title, value, type} = request.body;
        
        if(!title) 
        return response.status(404).json({err: '\'title\' field not informed'});
        if(!value) 
            return response.status(404).json({err: '\'value\' field not informed'});
        if(!type) 
            return response.status(404).json({err: '\'type\' field not informed'});
        if(type !== 'income' && type !== 'outcome') 
            return response.status(404).json({err: 'invalid \'type\' field informed'});

        return next();
    }
}