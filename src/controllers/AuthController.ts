import "reflect-metadata"
import { TYPES } from '../config/dependency/types'
import { inject, injectable } from 'inversify'
import { CrypTool } from '../utils/auth/CrypTool'
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { UsersRepo } from "../repos/UsersRepo"
import { User } from "../models/User"
import { ValidationError } from "sequelize"

export interface AuthController {

	login(req: Request, res: Response): Promise<void>
	register(req: Request, res: Response): Promise<void>
}


@injectable()
export class AuthControllerImplementation implements AuthController {

  	constructor(
		@inject(TYPES.CrypTool) private cryp: CrypTool,
		@inject(TYPES.UsersRepo) private usersRepo: UsersRepo
    ){}


	public async login(req: Request, res: Response): Promise<void> {
		try{
			let login = req.header("login") as string
			let password = req.header("password") as string
			let user = await this.usersRepo.getUserByLogin(login)
			if(user == null) 
				res.status(401).send()
			else if(await this.cryp.comparePassword(password, user.password)){
				res.status(200).send({
						userId: user.id,
						token: await this.cryp.generateTokenForUser(user.id.toString())
				})
			}
			else 
				res.status(401).send()
		}
		catch(err){
			res.status(500).send()
		}
	}


	public async register(req: Request, res: Response): Promise<void> {
		try{
			let user = User.build(req.body)
			user.password = await this.cryp.encodePassword(user.password)
			await this.usersRepo.addUser(user)
			res.status(201).send()
		}
		catch(err){
			if(err instanceof ValidationError){
				res.status(409).send({
					type: err.name,
					errors: err.errors
				})
			}
			 else{
				res.status(500).send()
			}
			
		}
	}
}  
