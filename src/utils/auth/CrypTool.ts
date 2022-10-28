import "reflect-metadata";
import bcrypt from 'bcrypt'
import { inject, injectable } from 'inversify'
import jwt from 'jwt-promisify'
import fs from 'fs'
import { TYPES } from "../../config/dependency/types";
import { KeyProvider } from "./KeyProvider";

export interface CrypTool{
	generateTokenForUser(userId: string): Promise<string>,
	verifyTokenForUser(userId: string, token: string): Promise<boolean>,
	encodePassword(pass: string): Promise<string>,
	comparePassword(pass: string, encodedPass: string): Promise<boolean>
}

interface TokenData{
	userId: string
}

@injectable()
export class CrypToolImplementation  implements CrypTool{

	constructor(@inject(TYPES.KeyProvider) private keyProvider: KeyProvider){}
	
	private saltRounds = 10

	public async generateTokenForUser(userId: string): Promise<string> {
		let secret = await this.keyProvider.getSecretKey()
		let data: TokenData = { userId: userId }
		return await jwt.sign(data,secret, { expiresIn: '1h' })
	}

	public async verifyTokenForUser(userId: string, token: string): Promise<boolean> {
		try{
			let secret = await this.keyProvider.getSecretKey()
			let decoded: unknown = await jwt.verify(token, secret)
			if((decoded as TokenData).userId == userId)
				return true
			else return false
		}
		catch(err){
			return false
		}
	}
	
	public encodePassword(pass: string): Promise<string> {
		return bcrypt
			.hash(pass, this.saltRounds)
	}
	public comparePassword(pass: string, encodedPass: string): Promise<boolean> {
		return bcrypt
      		.compare(pass, encodedPass)
	}
}
