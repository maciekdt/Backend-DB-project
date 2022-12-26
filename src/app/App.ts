import express, { Application } from "express"
import { inject, injectable } from "inversify"
import { appContainer } from "../config/dependency/Container"
import { TYPES } from "../config/dependency/types"
import { System } from "../config/system/System"
import { AuthRouter } from "../routes/AuthRouter"

export interface App{
	start(): Promise<Application>
	getBaseUrl(): string
}

@injectable()
export class AppImpl implements App {
	private app: Application = express()
	private PORT = 8000

	constructor(
		@inject(TYPES.AuthRouter) private authRouter: AuthRouter,
    ){}

	public async start(): Promise<Application> {
		await appContainer.get<System>(TYPES.System).init()
		this.app.use(express.json())
		this.app.use("/auth", this.authRouter.getRouter())
		this.app.get("/test-connection", (req, res) => { res.status(200).send() })

		this.app.listen(this.PORT, async(): Promise<void> => {
			
			console.log(`Server Running here 👉 ${this.getBaseUrl()}`)
		})

        return this.app
	}

	public getBaseUrl(): string {
		return "http://localhost:8000"
	}
}