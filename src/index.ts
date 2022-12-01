import { TYPES } from './config/dependency/types'
import express, {Request, Response, Application} from 'express'
import { AuthController, AuthControllerImplementation } from './controllers/AuthController'
import { appContainer } from './config/dependency/Container'
import { SystemConfigProvider } from './config/system/SystemConfigProvider'
import { UsersRepo } from './repos/UsersRepo'
import { User } from './models/User'
import { System } from './config/system/System'
import { Model } from 'sequelize'
import { AuthRouter } from './routes/AuthRouter'

const app: Application = express()
const PORT = 8000

app.use(express.json())
app.use("/auth", appContainer.get<AuthRouter>(TYPES.AuthRouter).getRouter())

app.listen(PORT, async(): Promise<void> => {
	await appContainer.get<System>(TYPES.System).init()
	console.log(`Server Running here 👉 http://localhost:${PORT}`)
})
