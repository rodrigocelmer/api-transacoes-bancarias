import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name:'users'})
export class UserEntity{
    @PrimaryColumn({type: 'uuid'})
    id!: string;

    @Column({length: 50})
    name!: string;

    @Column({unique: true, length: 11})
    cpf!: string;

    @Column({length: 50})
    email!: string;

    @Column()
    age!: number;
}