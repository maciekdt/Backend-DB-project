import { Association, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
import { Participation } from "./Participation";

export class Conversation 
    extends Model<InferAttributes<Conversation>, InferCreationAttributes<Conversation>> { 

    declare id: string
    declare creationTime: number
    declare name: number

    declare static associations: {
        participations: Association<Conversation, Participation>;
    }

    declare getParticipations: () => any
    declare addParticipation: (p: Participation, options: any) => any
}