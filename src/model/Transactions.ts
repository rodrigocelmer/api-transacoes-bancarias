import crypto from 'crypto';

export class Transactions{
    private _id: string;
    get id(): string {
        return this._id;
    }

    private _title: string;
    get title(): string {
        return this._title;
    }
    
    private _value: number;
    get value(): number {
        return this._value;
    }
    
    private _type: string;
    get type(): string {
        return this._type;
    }    

    constructor(title: string, value: number, type: string) {
        this._id = crypto.randomUUID();
        this._title = title;
        this._value = value;
        this._type = type;
    }

    toJson(){
        return{
            id: this._id,
            title: this._title,
            value: this._value,
            type: this._type
        }
    }
}