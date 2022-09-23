import { Transactions } from "./Transactions";
import crypto from 'crypto';

export class User {
    private _id: string;
    private _name: string;
    private _cpf: string;
    private _age: number;
    private _transactions: Transactions[];


    constructor(name: string, cpf: string, age: number) {
        this._id = crypto.randomUUID();
        this._name = name;
        this._cpf = cpf;
        this._age = age;
        this._transactions = [];
    }
}