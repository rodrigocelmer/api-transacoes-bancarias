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
        const {userId} = request.params;
        const user = usersDB.find((user) => user.id === userId) as User;

        return response.json(user.toJson());
    }

    getAll(request: Request, response: Response) {
        const { name, email, cpf } = request.query;
        let allUsersFounded = usersDB.map( user => {
            return user.toJson();
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

    remove(request: Request, response: Response){
        const {userId} = request.params;
        const userIndex = usersDB.findIndex(u => u.id === userId);

        usersDB.splice(userIndex, 1);

        return response.json({msg: 'user deleted'});
    }

    update(request: Request, response: Response){
        const {userId} = request.params;
        const {name, cpf, email, age} = request.body;
        const user = usersDB.find(u => u.id === userId) as User;

        user.update(name, cpf, email, age);

        return response.json(user?.toJson());
    }
}