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

    getAll(request: Request, response: Response) {

        let allUsersFounded = usersDB.map( user => {
            return user.toJson();
        })

        const { name, email, cpf } = request.query;

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

        console.log(allUsersFounded);
        


        return response.json(allUsersFounded);
    }
}