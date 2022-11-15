import { InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare login: string
    declare password: string
    declare firstName: string
    declare lastName: string
}

