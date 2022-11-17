import { NextFunction, Request, Response } from "express";
import { usersDB } from "../db/users";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { pgHelper } from "../database/pg-helper";
import { UserEntity } from "../database/entities/user.entity";
import { UserRepository } from "../repositories/users.repository";

export class UserMiddleware {
    validateUserBody(request: Request, response: Response, next: NextFunction){
        const {name, cpf, email, age} = request.body;

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

    async validateUserId(request: Request, response: Response, next: NextFunction){
        const {userId} = request.params;
        const repository = new UserRepository();
        const user = await repository.getById(userId);

        if(!user){
            return response.status(404).json({err: 'user not found'});
        }

        return next();        
    }

    validateCpf(request: Request, response: Response, next: NextFunction){
        const {cpf} = request.body;
        request.body.cpf = cpf.replace(/\W/g, '');

        if(!cpfValidator.isValid(request.body.cpf)){
            return response.status(400).json({err: 'invalid cpf'})
        }

        if(usersDB.some((user => user.cpf === request.body.cpf))){
            
            return response.status(400).json({err: 'there is already an user with this cpf'})
        }

        return next();
    }
}
