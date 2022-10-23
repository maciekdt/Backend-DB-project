import "reflect-metadata"
import { TYPES } from '../config/dependency/types'
import { inject, injectable } from 'inversify'
import {ICrypTool} from '../utils/auth/CrypTool'

export interface IAuthController {
  getHash(pass: string): Promise<string>
}


@injectable()
export class AuthController implements IAuthController {

  constructor(@inject(TYPES.CrypTool) private cryp: ICrypTool){}

  public async getHash(pass: string): Promise<string> {
    return this.cryp.encodePassword(pass)
  }
}
