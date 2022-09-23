import { Transactions } from "./Transactions";
import crypto from 'crypto';

export class User {
    private _id: string;
    private _name: string;
    private _cpf: string;
    private _email: string;
    private _age: number;
    private _transactions: Transactions[];


    constructor(name: string, cpf: string, email: string, age: number) {
        this._id = crypto.randomUUID();
        this._name = name;
        this._cpf = cpf;
        this._email = email
        this._age = age;
        this._transactions = [];
    }

    toJson(){
        return{
            id: this._id,
            name: this._name,
            cpf: this._cpf,
            email: this._email,
            age: this._age
        }
    }
}