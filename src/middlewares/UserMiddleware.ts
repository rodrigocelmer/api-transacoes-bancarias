import { NextFunction, Request, Response } from "express";
import { usersDB } from "../db/users";
import { Transactions } from "../model/Transactions";
import { User } from "../model/User";

export class UserMiddleware {
    validateUpdateUser(request: Request, response: Response, next: NextFunction){
        const {id} = request.params;
        const {name, cpf, email, age} = request.body;
        const user = usersDB.find(u => u.id === id);

        if(!user){
            return response.status(404).json({err: 'user not found'});
        }
        
        if(!name) 
            return response.status(404).json({err: '\'name\' field not informed'});
        if(!cpf) 
            return response.status(404).json({err: '\'cpf\' field not informed'});
        if(!email) 
            return response.status(404).json({err: '\'email\' field not informed'});
        if(!age) 
            return response.status(404).json({err: '\'age\' field not informed'});
    
        return next();
    }

    validateUserId(request: Request, response: Response, next: NextFunction){
        const {userId} = request.params;
        const user = usersDB.find(u => u.id === userId);

        if(!user){
            return response.status(404).json({err: 'user not found'});
        }

        return next();        
    }
}
