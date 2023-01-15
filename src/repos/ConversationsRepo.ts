import { inject, injectable } from "inversify";
import { Transaction } from "sequelize";
import { TYPES } from "../config/dependency/types";
import { DataBaseContext } from "../database/DataBaseContext";
import { Conversation } from "../models/Conversation";
import { Participation } from "../models/Participation";
import { User } from "../models/User";

export interface ConversationRepo{
    addConversationForUser(userId: string, converation: Conversation, participation: Participation): Promise<void>
    getConversationsForUser(userId: string): Promise<Conversation[]>
}


@injectable()
export class ConversationRepoImpl implements ConversationRepo{

    constructor(
        @inject(TYPES.DataBaseContext) private db: DataBaseContext
    ){}

    public async addConversationForUser(
        userId: string,
        conversation: Conversation,
        participation: Participation): Promise<void>{

        const t = await this.db.getClient().transaction()
        var user = await User.findByPk(userId)
        try{
            if(user == null) throw Error()
            await conversation.save({transaction: t})
            await participation.save({transaction: t})
            await user.addParticipation(participation, {transaction: t})
            await conversation.addParticipation(participation, {transaction: t})
            await t.commit();
        }
        catch(err){
            await t.rollback()
            throw err
        }
    }

    public async getConversationsForUser(userId: string): Promise<Conversation[]>{
        return await Conversation.findAll({
            attributes: {exclude: ['Participation']},
            include: [{
              model: Participation,
              where: { userId }
            }]
          })
    }
    
}