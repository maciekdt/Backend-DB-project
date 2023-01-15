import { InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";

export class Message
    extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> { 

    declare id: string
    declare content: string
    declare sendingTime: number
}