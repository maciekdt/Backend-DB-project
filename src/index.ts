import { TYPES } from './config/dependency/types'
import express, {Request, Response, Application} from 'express'
import { IAuthController, AuthController } from './controllers/Auth'
import { appContainer } from './config/dependency/Container'


const app: Application = express()
const PORT = 8000

app.get("/", async (req: Request, res: Response): Promise<void>  => {
	const auth = appContainer.get<IAuthController>(TYPES.Auth);
	res.send(await auth.getHash("PASS"))
})

app.listen(PORT, (): void => {
	console.log(`Server Running here 👉 http://localhost:${PORT}`)
})
