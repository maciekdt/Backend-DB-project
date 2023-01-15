import { Association, InferAttributes, InferCreationAttributes, Model, Optional } from "sequelize";
import { Participation } from "./Participation";

export class User 
    extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
        
    declare id: string
    declare login: string
    declare password: string
    declare firstName: string
    declare lastName: string
    
    declare static associations: {
        participations: Association<User, Participation>;
    }

    declare getParticipations: () => any
    declare addParticipation: (p:Participation, options:any) => any
}

