import { injectable } from "inversify";
import { User } from "../models/User";

export interface UsersRepo{
    getUserByLogin(userLogin: string): Promise<User>
    addUser(newUser: User): Promise<void>
}

@injectable()
export class UsersRepoImplementaion implements UsersRepo{
    getUserByLogin(userLogin: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    public async addUser(newUser: User): Promise<void> {
        await User.create(newUser)
    }
    
}