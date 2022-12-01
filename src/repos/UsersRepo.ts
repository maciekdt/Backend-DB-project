import { injectable } from "inversify";
import { User } from "../models/User";

export interface UsersRepo{
    getUserByLogin(userLogin: string): Promise<User|null>
    addUser(newUser: User): Promise<void>
}

@injectable()
export class UsersRepoImplementaion implements UsersRepo{
    public async getUserByLogin(userLogin: string): Promise<User|null> {
        return await User.findOne({where: {login: userLogin}})
    }
    public async addUser(newUser: User): Promise<void> {
        await newUser.save()
    }
}