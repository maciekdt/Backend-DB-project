import { Container } from "inversify"
import "reflect-metadata"
import { TYPES } from "./types"
import { CrypTool, CrypToolImplementation  } from "../../utils/auth/CrypTool"
import { AuthController, AuthControllerImplementation } from "../../controllers/Auth"
import { KeyProvider, KeyFromTextFile } from "../../utils/auth/KeyProvider" 
import { UsersRepo, UsersRepoImplementaion } from "../../repos/UsersRepo"
import { SystemConfigFromJson, SystemConfigProvider } from "../system/SystemConfigProvider"


const appContainer = new Container()
appContainer.bind<CrypTool>(TYPES.CrypTool).to(CrypToolImplementation )
appContainer.bind<AuthController>(TYPES.Auth).to(AuthControllerImplementation)
appContainer.bind<UsersRepo>(TYPES.UsersRepo).to(UsersRepoImplementaion)
appContainer.bind<KeyProvider>(TYPES.KeyProvider).to(KeyFromTextFile).inSingletonScope()
appContainer.bind<SystemConfigProvider>(TYPES.SystemConfigProvider).to(SystemConfigFromJson).inSingletonScope()

export { appContainer }