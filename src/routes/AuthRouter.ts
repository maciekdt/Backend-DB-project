import express, { Router, Request, Response, NextFunction} from "express"
import { inject, injectable } from "inversify"
import { TYPES } from "../config/dependency/types"
import { AuthController } from "../controllers/AuthController"
//import {AuthTools, AuthToolsI} from '../controllers/auth/AuthTools'

export interface AuthRouter{
	getRouter(): Router
}

@injectable()
export class AuthRouterImpl implements AuthRouter{

	constructor(
		@inject(TYPES.AuthController) private ctrl: AuthController
    ){}

	public getRouter(){
		const router: Router = express.Router()

		router.get('/login', async(req, res, next) => {
			await this.ctrl.login(req, res)
		})
		
		router.post('/register', async(req, res, next) => {
			await this.ctrl.register(req, res)
		})

		return router
	}
}