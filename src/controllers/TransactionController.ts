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
}