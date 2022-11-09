import "reflect-metadata"
import { TYPES } from '../config/dependency/types'
import { inject, injectable } from 'inversify'
import { CrypTool } from '../utils/auth/CrypTool'
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { UsersRepo } from "../repos/UsersRepo"
import { User } from "../models/User"

export interface AuthController {

	getHash(pass: string): Promise<boolean>,
	login(req: Request, res: Response): Promise<void>
}


@injectable()
export class AuthControllerImplementation implements AuthController {

  	constructor(
		@inject(TYPES.CrypTool) private cryp: CrypTool,
		@inject(TYPES.UsersRepo) private usersRepo: UsersRepo
    ){}

	public async login(req: Request, res: Response): Promise<void> {
		//try{
			let login = req.header("login") as string
			let password = req.header("password") as string
			let user: User = await this.usersRepo.getUserByLogin(login)
			if(await this.cryp.comparePassword(password, user.password)){
				res.status(200)
				res.send({
					userId: user.id,
					token: await this.cryp.generateTokenForUser(user.id)
				})
			}
			else{
				
			}
		//}
	}

  	public async getHash(pass: string): Promise<boolean> {
		let token = await this.cryp.generateTokenForUser("ABC")
    	return await this.cryp.verifyTokenForUser("ABC", token)
  	}
}  
