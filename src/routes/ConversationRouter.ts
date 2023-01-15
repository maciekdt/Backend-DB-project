import express, { Router } from "express"
import { inject, injectable } from "inversify"
import { TYPES } from "../config/dependency/types"
import { ConversationController } from "../controllers/ConversationController"

export interface ConversationRouter{
	getRouter(): Router
}

@injectable()
export class ConversationRouterImpl implements ConversationRouter{

	constructor(
		@inject(TYPES.ConversationController) private ctrl: ConversationController
    ){}

	public getRouter(){
		const router: Router = express.Router()

		router.post('/', async(req, res, next) => {
			await this.ctrl.addConversationForUser(req, res)
		})

        router.get('/', async(req, res, next) => {
			await this.ctrl.getConverationsForUser(req, res)
		})

		router.post('/message/:conversationId', async(req, res, next) => {
			await this.ctrl.addMessageForUserAndConversation(req, res)
		})

		router.get('/message/:conversationId', async(req, res, next) => {
			await this.ctrl.getMessagesForConversation(req, res)
		})

		router.post('/:conversationId/:userId', async(req, res, next) => {
			await this.ctrl.addUserForConversation(req, res)
		})

		return router
	}
}