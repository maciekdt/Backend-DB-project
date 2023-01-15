import { inject, injectable } from "inversify";
import { Transaction } from "sequelize";
import { TYPES } from "../config/dependency/types";
import { DataBaseContext } from "../database/DataBaseContext";
import { Conversation } from "../models/Conversation";
import { Message } from "../models/Message";
import { Participation } from "../models/Participation";
import { User } from "../models/User";

export interface ConversationRepo{
    createConversationForUser(userId: string, converation: Conversation, participation: Participation): Promise<void>
    getConversationsForUser(userId: string): Promise<Conversation[]>
    addMessageForUserAndConversation(userId: string, conversationId: string, msg: Message): Promise<void>
    getMessagesForConversation(conversationId: string): Promise<Message[]>
    addUserToConversation(userId: string, participation: Participation, convId: string): Promise<void>
}


@injectable()
export class ConversationRepoImpl implements ConversationRepo{


    constructor(
        @inject(TYPES.DataBaseContext) private db: DataBaseContext
    ){}


    public async createConversationForUser(
        userId: string,
        conversation: Conversation,
        participation: Participation): Promise<void>{

        var user = await User.findByPk(userId)
        const t = await this.db.getClient().transaction()
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
              where: { userId: userId }
            }]
        })
    }


    public async addMessageForUserAndConversation(
        userId: string, 
        conversationId: string, 
        msg: Message): Promise<void>{

        var participation = await Participation.findOne({
            include: [
                { model: User, where: { id: userId } },
                { model: Conversation, where: { id: conversationId } }
            ]
        })
        const t = await this.db.getClient().transaction()
        try{
            if(participation == null) throw Error()
            await msg.save({transaction: t})
            await participation.addMessage(msg, {transaction: t})
            await t.commit();
        }
        catch(err){
            await t.rollback()
            throw err
        }
    }

    public async getMessagesForConversation(conversationId: string): Promise<Message[]>{
        let messages = await Message.findAll({
            attributes: ['id', "content", "sendingTime"],
            order: [['sendingTime', 'DESC']],
            include: [
                { 
                    model: Participation, 
                    where: { conversationId: conversationId },
                    attributes: ['id'],
                    include: [{ 
                        model: User, 
                        attributes: ["id", "login", "firstName", "lastName"],
                        required: true
                    }]
                }
            ]
        })
        return messages
    }



    public async addUserToConversation(
        userId: string, 
        participation: Participation, 
        convId: string): Promise<void>{

        var user = await User.findByPk(userId)
        var conv = await Conversation.findByPk(convId)
        const t = await this.db.getClient().transaction()

        try{
            if(user == null && conv == null) throw Error()
            await participation.save({transaction: t})
            await user?.addParticipation(participation,{transaction: t})
            await conv?.addParticipation(participation, {transaction: t})
            await t.commit();
        }
        catch(err){
            await t.rollback()
            throw err
        }
    }
    
}