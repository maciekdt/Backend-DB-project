import { User } from "../models/User";

export interface IUsersRepo{
    getUserByLogin(userLogin: string): Promise<User>
    addUser(newUser: User): Promise<void>
}


export class UsersRepo implements IUsersRepo{
    getUserByLogin(userLogin: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    addUser(newUser: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}