import "reflect-metadata"
import { TYPES } from '../config/dependency/types'
import { inject, injectable } from 'inversify'
import {ICrypTool} from '../utils/auth/CrypTool'
import { Request, Response } from "express"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"
import { IUsersRepo } from "../repos/UsersRepo"

export interface IAuthController {
  getHash(pass: string): Promise<boolean>,
  login(req: Request, res: Response): Promise<Response>
}


@injectable()
export class AuthController implements IAuthController {

  constructor(
    @inject(TYPES.CrypTool) private cryp: ICrypTool,
    @inject(TYPES.UsersRepo) private usersReop: IUsersRepo
    ){}

  public async login(req: Request, res: Response): Promise<Response> {
    throw new Error("Method not implemented.")
  }

  public async getHash(pass: string): Promise<boolean> {
    let token = await this.cryp.generateTokenForUser("ABC")
    return await this.cryp.verifyTokenForUser("ABC", token)
  }
}
