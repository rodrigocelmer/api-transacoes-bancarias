import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({name:'transactions'})
export class TransactionEntity{
    @PrimaryColumn({type: 'uuid'})
    id!: string;

    @Column({length: 20})
    title!: string;

    @Column()
    value!: number;

    @Column({length: 7})
    type!: string;

    @ManyToOne(() => UserEntity, (user) => user.transactions)
    user!: UserEntity;
}