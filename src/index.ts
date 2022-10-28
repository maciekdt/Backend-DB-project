import { TYPES } from './config/dependency/types'
import express, {Request, Response, Application} from 'express'
import { AuthController, AuthControllerImplementation } from './controllers/Auth'
import { appContainer } from './config/dependency/Container'
import { SystemConfigProvider } from './config/system/SystemConfigProvider'

const app: Application = express()
const PORT = 8000

appContainer.get<SystemConfigProvider>(TYPES.SystemConfigProvider).init();
app.get("/", async (req: Request, res: Response): Promise<void>  => {
	const auth = appContainer.get<AuthController>(TYPES.Auth);
	res.send(await auth.getHash("PASS"))
})

app.get("/test", async (req: Request, res: Response): Promise<void>  => {
	await appContainer.get<SystemConfigProvider>(TYPES.SystemConfigProvider).init();
	res.send()
})

app.listen(PORT, (): void => {
	console.log(`Server Running here 👉 http://localhost:${PORT}`)
})
