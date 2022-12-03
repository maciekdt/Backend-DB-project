import { Container } from "inversify"
import "reflect-metadata"
import { CrypTool, CrypToolImplementation  } from "../../utils/auth/CrypTool"
import { AuthController, AuthControllerImplementation } from "../../controllers/AuthController"
import { KeyProvider, KeyFromTextFile } from "../../utils/auth/KeyProvider" 
import { UsersRepo, UsersRepoImplementaion } from "../../repos/UsersRepo"
import { SystemConfigFromJson, SystemConfigProvider } from "../system/SystemConfigProvider"
import { FileRepo, FileRepoFs } from "../../utils/files/FileRepo"
import { DataBaseService, SequalizeService } from "../../database/DataBaseService"
import { System, SystemImpl } from "../system/System"
import { TYPES } from "./types"
import { AuthRouter, AuthRouterImpl } from "../../routes/AuthRouter"


const appContainer = new Container()
appContainer.bind<CrypTool>(TYPES.CrypTool).to(CrypToolImplementation )
appContainer.bind<AuthController>(TYPES.AuthController).to(AuthControllerImplementation)
appContainer.bind<UsersRepo>(TYPES.UsersRepo).to(UsersRepoImplementaion)
appContainer.bind<FileRepo>(TYPES.FileRepo).to(FileRepoFs)
appContainer.bind<System>(TYPES.System).to(SystemImpl)
appContainer.bind<AuthRouter>(TYPES.AuthRouter).to(AuthRouterImpl)

appContainer.bind<DataBaseService>(TYPES.DataBaseService).to(SequalizeService).inSingletonScope()
appContainer.bind<KeyProvider>(TYPES.KeyProvider).to(KeyFromTextFile).inSingletonScope()
appContainer.bind<SystemConfigProvider>(TYPES.SystemConfigProvider).to(SystemConfigFromJson).inSingletonScope()

export { appContainer }