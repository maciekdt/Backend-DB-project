import "reflect-metadata"
import { TYPES } from '../config/dependency/types'
import { inject, injectable } from 'inversify'
import {ICrypTool} from '../utils/auth/CrypTool'

export interface IAuthController {
  getHash(pass: string): Promise<boolean>
}


@injectable()
export class AuthController implements IAuthController {

  constructor(@inject(TYPES.CrypTool) private cryp: ICrypTool){}

  public async getHash(pass: string): Promise<boolean> {
    let token = await this.cryp.generateTokenForUser("ABC")
    return this.cryp.verifyTokenForUser("ABC", token)
  }
}
