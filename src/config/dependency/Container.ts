import { Container } from "inversify"
import "reflect-metadata"
import { CrypTool, CrypToolImplementation  } from "../../utils/auth/CrypTool"
import { AuthController, AuthControllerImpl } from "../../controllers/AuthController"
import { KeyProvider, KeyFromTextFile } from "../../utils/auth/KeyProvider" 
import { UsersRepo, UsersRepoImplementaion } from "../../repos/UsersRepo"
import { SystemConfigFromJson, SystemConfigProvider } from "../system/SystemConfigProvider"
import { FileRepo, FileRepoFs } from "../../utils/files/FileRepo"
import { DataBaseContext, SequalizeContext } from "../../database/DataBaseContext"
import { System, SystemImpl } from "../system/System"
import { TYPES } from "./types"
import { AuthRouter, AuthRouterImpl } from "../../routes/AuthRouter"
import { App, AppImpl } from "../../app/App"
import { ConversationRepo, ConversationRepoImpl } from "../../repos/ConversationsRepo"
import { ConversationController, ConversationControllerImpl } from "../../controllers/ConversationController"
import { ConversationRouter, ConversationRouterImpl } from "../../routes/ConversationRouter"


const appContainer = new Container()
appContainer.bind<CrypTool>(TYPES.CrypTool).to(CrypToolImplementation )
appContainer.bind<AuthController>(TYPES.AuthController).to(AuthControllerImpl)
appContainer.bind<UsersRepo>(TYPES.UsersRepo).to(UsersRepoImplementaion)
appContainer.bind<FileRepo>(TYPES.FileRepo).to(FileRepoFs)
appContainer.bind<System>(TYPES.System).to(SystemImpl)
appContainer.bind<AuthRouter>(TYPES.AuthRouter).to(AuthRouterImpl)
appContainer.bind<App>(TYPES.App).to(AppImpl)
appContainer.bind<ConversationRepo>(TYPES.ConversationRepo).to(ConversationRepoImpl)
appContainer.bind<ConversationController>(TYPES.ConversationController).to(ConversationControllerImpl)
appContainer.bind<ConversationRouter>(TYPES.ConversationRouter).to(ConversationRouterImpl)

appContainer.bind<DataBaseContext>(TYPES.DataBaseContext).to(SequalizeContext).inSingletonScope()
appContainer.bind<KeyProvider>(TYPES.KeyProvider).to(KeyFromTextFile).inSingletonScope()
appContainer.bind<SystemConfigProvider>(TYPES.SystemConfigProvider).to(SystemConfigFromJson).inSingletonScope()

export { appContainer }