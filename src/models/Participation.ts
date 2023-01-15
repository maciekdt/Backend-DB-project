import { Association, ForeignKey, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
import { Message } from "./Message";
import { User } from "./User";

export class Participation
    extends Model<InferAttributes<Participation>, InferCreationAttributes<Participation>> { 

    declare id: string
    declare static associations: {
        participations: Association<Participation, Message>;
    }

    declare getMessages: () => any
    declare addMessage: (m:Message, options:any) => any
}