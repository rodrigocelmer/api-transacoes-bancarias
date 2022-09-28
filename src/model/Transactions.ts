import crypto from 'crypto';

export class Transactions{
    private _id: string;
    private _title: string;
    private _value: number;
    private _type: string;

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