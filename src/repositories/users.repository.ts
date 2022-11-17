import { User } from "../model/User";
import { pgHelper } from "../database/pg-helper";
import { UserEntity } from "../database/entities/user.entity";

export class UserRepository {
    async create(user: User): Promise<void>{
        const manager = pgHelper.client.manager;
        const userEntity = manager.create(UserEntity, {
            id: user.id,
            name: user.name,
            cpf: user.cpf,
            email: user.email,
            age: user.age
        })

        await manager.save(userEntity);
    }

    async getById(userId: string): Promise<UserEntity> {
        const manager = pgHelper.client.manager;
        const userEntity = await manager.findOneBy(UserEntity, {id: userId}) as UserEntity;

        return userEntity;
    }

    async getAll(): Promise<UserEntity[]> {
        const manager = pgHelper.client.manager;
        const userEntity:UserEntity[] = await manager.find(UserEntity);
        
        return userEntity;
    }

    async remove(userId: string){
        const manager = pgHelper.client.manager;
        await manager.delete(UserEntity, {id: userId});
    }
}