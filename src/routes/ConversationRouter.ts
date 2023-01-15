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

		router.post('/conversation', async(req, res, next) => {
			await this.ctrl.addConversationForUser(req, res)
		})

        router.get('/conversation', async(req, res, next) => {
			await this.ctrl.getConverationsForUser(req, res)
		})

		return router
	}
}