import { Request, Response } from "express";
import { usersDB } from "../db/users";
import { Transactions } from "../model/Transactions";

export class TransactionController{
    create(request: Request, response: Response) {
        const {title, value, type} = request.body;
        const {userId} = request.params;
        const user = usersDB.find(u => u.id === userId);

        const transactions = new Transactions(title, value, type);

        user?.setTransactions(transactions);

        return response.json(transactions.toJson());
    }  
    
    getById(request: Request, response: Response) {
        const {userId, transId} = request.params;
        const user = usersDB.find(u => u.id === userId);
        const transaction = user?.transactions.find(t => t.id === transId);

        return response.json(transaction?.toJson());
    }

    getAll(request: Request, response: Response) {
        const {userId, transId} = request.params;
        const user = usersDB.find(u => u.id === userId);
        const {title, type} = request.query;
        let allTransFounded = user?.transactions.map( trans => {
            return trans.toJson();
        })

        if(title) {
            allTransFounded = allTransFounded?.filter(trans => {
                return trans.title.toLowerCase().includes(title.toString().toLowerCase());
            })
        }

        if(type) {
            allTransFounded = allTransFounded?.filter(trans => {
                return trans.type.toLowerCase().includes(type.toString().toLowerCase());
            })
        }

        const resp = {
            transactions: allTransFounded,
            balance: user?.sumTrans()
        }

        return response.json(resp);
    }
}