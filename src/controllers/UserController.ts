import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { User } from "../model/User";

export class UserController {
    create(request: Request, response: Response) {
        const {name, cpf, email, age} = request.body;

        const user = new User(name, cpf, email, age);

        usersDB.push(user);

        return response.json(user.toJson());
    };

    getById(request: Request, response: Response){
        const {id} = request.params;

        const user = usersDB.find((user) => user.id === id);

        if(!user) {
            return response.status(404).json({err: 'user not found'});
        }

        return response.json(user.toJson());
    }
}