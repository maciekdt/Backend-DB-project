import { Container } from "inversify"
import "reflect-metadata"
import { TYPES } from "./types"
import { ICrypTool, CrypTool } from "../../utils/auth/CrypTool"
import { IAuthController, AuthController } from "../../controllers/Auth"
import { IKeyProvider, KeyProvider } from "../../utils/auth/KeyProvider" 


const appContainer = new Container()
appContainer.bind<ICrypTool>(TYPES.CrypTool).to(CrypTool)
appContainer.bind<IAuthController>(TYPES.Auth).to(AuthController)
appContainer.bind<IKeyProvider>(TYPES.KeyProvider).to(KeyProvider)

export { appContainer }