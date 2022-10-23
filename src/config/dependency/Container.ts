import { Container } from "inversify"
import "reflect-metadata"
import { TYPES } from "./types"
import { ICrypTool, CrypTool } from "../../utils/auth/CrypTool"
import { IAuthController, AuthController } from "../../controllers/Auth"


const appContainer = new Container()
appContainer.bind<ICrypTool>(TYPES.CrypTool).to(CrypTool)
appContainer.bind<IAuthController>(TYPES.Auth).to(AuthController)

export { appContainer }