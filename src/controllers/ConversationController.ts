import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { inject, injectable } from "inversify"
import { ParsedQs } from "qs"
import { TYPES } from "../config/dependency/types"
import { Conversation } from "../models/Conversation"
import { Message } from "../models/Message"
import { Participation } from "../models/Participation"
import { ConversationRepo } from "../repos/ConversationsRepo"
import { UsersRepo } from "../repos/UsersRepo"

export interface ConversationController {

	addConversationForUser(req: Request, res: Response): Promise<void>
    getConverationsForUser(req: Request, res: Response): Promise<void>
    addMessageForUserAndConversation(req: Request, res: Response): Promise<void>
    getMessagesForConversation(req: Request, res: Response): Promise<void>
    addUserForConversation(req: Request, res: Response): Promise<void>
}


@injectable()
export class ConversationControllerImpl implements ConversationController {

  	constructor(
		@inject(TYPES.ConversationRepo) private convRepo: ConversationRepo,
        @inject(TYPES.UsersRepo) private usersRepo: UsersRepo
    ){}


	public async addConversationForUser(req: Request, res: Response): Promise<void> {
		try{
			let userId = req.header("userId") as string
            let conversation = Conversation.build(req.body.conversation)
            let participation = Participation.build(req.body.participation)
			await this.convRepo.createConversationForUser(userId, conversation, participation)
            res.status(201).send()
		}
		catch(err){
			res.status(500).send()
		}
	}


    public async getConverationsForUser(req: Request, res: Response): Promise<void> {
        try{
            let userId = req.header("userId") as string
            let convs = await this.convRepo.getConversationsForUser(userId)
            res.status(200).json(
                convs.map(({id, name, creationTime}) => ({id, name, creationTime}))
            )
        }
        catch(err){
            res.status(500).send()
        }
    }


    public async addMessageForUserAndConversation(req: Request, res: Response): Promise<void> {
        try{
            let userId = req.header("userId") as string
            let convId = req.params.conversationId as string
            let msg = Message.build(req.body)
            await this.convRepo.addMessageForUserAndConversation(userId, convId, msg)
            res.status(201).send()
        }
        catch(err){
            res.status(500).send()
        }
    }


    public async getMessagesForConversation(req: Request, res: Response): Promise<void> {
        try{
            let convId = req.params.conversationId as string
            res.status(200).json(await this.convRepo.getMessagesForConversation(convId))
        }
        catch(err){
            res.status(500).send()
        }
    }

    public async addUserForConversation(req: Request, res: Response): Promise<void> {
        try{
            let login = req.params.login as string
            let convId = req.params.conversationId as string
            let participation = Participation.build(req.body)
            await this.convRepo.addUserToConversation(login, participation, convId)
            res.status(201).send()
        }
        catch(err){
            res.status(500).send()
        }
    }
}  