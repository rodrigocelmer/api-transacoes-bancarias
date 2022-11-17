import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { User } from "../model/User";
import { UserRepository } from "../repositories/users.repository";

export class UserController {
    async create(request: Request, response: Response) {
        const {name, cpf, email, age} = request.body;
        const user = new User(name, cpf, email, age);
        const repository = new UserRepository();

        await repository.create(user);        

        return response.json(user.toJson());
    };

    async getById(request: Request, response: Response){
        const {userId} = request.params;
        const repository = new UserRepository();
        const user = await repository.getById(userId);

        return response.json(user);
    }

    async getAll(request: Request, response: Response) {
        const { name, email, cpf } = request.query;
        const repository = new UserRepository();
        let allUsersFounded = (await repository.getAll()).map( user => {
            return user;
        })

        if(name) {
            allUsersFounded = allUsersFounded.filter(user => {
                return user.name.toLowerCase().includes(name.toString().toLowerCase())
            })
        }

        if(email) {
            allUsersFounded = allUsersFounded.filter(user => {
                return user.email.toLowerCase().includes(email.toString().toLowerCase())
            })
        }

        if(cpf) {
            allUsersFounded = allUsersFounded.filter(user => {
                return user.cpf.toLowerCase().includes(cpf.toString().toLowerCase())
            })
        }

        return response.json(allUsersFounded);
    }

    async remove(request: Request, response: Response){
        const {userId} = request.params;
        const repository = new UserRepository();

        await repository.remove(userId);

        return response.json({msg: 'user deleted'});
    }

    async update(request: Request, response: Response){
        const {userId} = request.params;
        const {name, cpf, email, age} = request.body;
        const toUpdate = User.create(userId, name, cpf, email, age);
        const repository = new UserRepository();

        await repository.update(userId, toUpdate)

        return response.json(toUpdate.toJson());
    }
}