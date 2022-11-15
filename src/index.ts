import { TYPES } from './config/dependency/types'
import express, {Request, Response, Application} from 'express'
import { AuthController, AuthControllerImplementation } from './controllers/Auth'
import { appContainer } from './config/dependency/Container'
import { SystemConfigProvider } from './config/system/SystemConfigProvider'
import { UsersRepo } from './repos/UsersRepo'
import { User } from './models/User'
import { System } from './config/system/System'

const app: Application = express()
const PORT = 8000

app.get("/", async(req: Request, res: Response): Promise<void>  => {
	const repo = appContainer.get<UsersRepo>(TYPES.UsersRepo)
	//await repo.addUser(
		await User.create({
			login: "mdt",
			password: "pass",
			firstName: "Maciek",
			lastName: "Dutkowski"
		})
	//)
})

app.get("/test", async(req: Request, res: Response): Promise<void>  => {
	res.send()
})

app.listen(PORT, async(): Promise<void> => {
	await appContainer.get<System>(TYPES.System).init()
	console.log(`Server Running here 👉 http://localhost:${PORT}`)
})
