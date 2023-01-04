import express, { Application } from "express"
import { Server, IncomingMessage, ServerResponse } from "http"
import { inject, injectable } from "inversify"
import { appContainer } from "../config/dependency/Container"
import { TYPES } from "../config/dependency/types"
import { System } from "../config/system/System"
import { AuthRouter } from "../routes/AuthRouter"

export interface App{
	start(): Promise<Application>
	getBaseUrl(): string
	stop(): void
}

@injectable()
export class AppImpl implements App {
	private app: Application = express()
	private PORT = 8000
	private server: Server<typeof IncomingMessage, typeof ServerResponse>|null = null

	constructor(
		@inject(TYPES.AuthRouter) private authRouter: AuthRouter,
    ){}

	public async start(): Promise<Application> {
		await appContainer.get<System>(TYPES.System).init()
		this.app.use(express.json())
		this.app.use("/auth", this.authRouter.getRouter())
		this.app.get("/test-connection", (req, res) => { res.status(200).send() })

		this.server = this.app.listen(this.PORT, async(): Promise<void> => {
			
			console.log(`Server Running here 👉 ${this.getBaseUrl()}`)
		})

        return this.app
	}

	public stop(): void {
		this.server?.close()
	}

	public getBaseUrl(): string {
		return "http://localhost:8000"
	}
}