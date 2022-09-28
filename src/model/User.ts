import { Transactions } from "./Transactions";
import crypto from 'crypto';

export class User {
    private _id: string;
    get id(): string {
        return this._id;
    }

    private _name: string;
    get name(): string {
        return this._name;
    }

    private _cpf: string;
    get cpf(): string {
        return this._cpf;
    }

    private _email: string;
    get email(): string {
        return this._email;
    }

    private _age: number;
    get age(): number {
        return this._age;
    }

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

    update(name: string, cpf: string, email: string, age: number){
        this._name = name;
        this._cpf = cpf;
        this._email = email;
        this._age = age;
    }
}