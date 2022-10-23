import "reflect-metadata";
import bcrypt from 'bcrypt'
import { injectable } from 'inversify'

export interface ICrypTool{
	/*generateTokenForUser(userId: string): Promise<string>,
	validateTokenForUser(userId: string, token: string): Promise<boolean>,*/
	encodePassword(pass: string): Promise<string>,
	comparePassword(pass: string, encodedPass: string): Promise<boolean>
}


@injectable()
export class CrypTool implements ICrypTool{
	private saltRounds = 10
	public encodePassword(pass: string): Promise<string> {
		return bcrypt
			.hash(pass, this.saltRounds)
	}
	public comparePassword(pass: string, encodedPass: string): Promise<boolean> {
		return bcrypt
      		.compare(pass, encodedPass)
	}
}
