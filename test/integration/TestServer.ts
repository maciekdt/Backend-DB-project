import axios, { AxiosInstance } from "axios"
import { ChildProcessWithoutNullStreams, spawn } from "child_process"
import { Application } from "express"
import { env } from "process"
import { App } from "../../src/app/App"
import { appContainer } from "../../src/config/dependency/Container"
import { TYPES } from "../../src/config/dependency/types"


export class TestServer{
    private app: App = appContainer.get(TYPES.App)
    private testServerProcess: ChildProcessWithoutNullStreams|null = null
    private api: AxiosInstance|null = null


    private async waitForURLReachable(url: string, timeout: number = 5000): Promise<boolean> {
        const timeoutThreshold = Date.now() + timeout
        while (true) {
            try {
                await axios.get(url)
                //console.log("Client connected with test server")
                return true
            } catch (err) {
                if (Date.now() > timeoutThreshold) {
                    throw new Error(`URL ${url} not reachable after ${timeout}ms`)
                }
                await new Promise(resolve => setTimeout(resolve, 100))
            }
        }
    }

    public async startServer(): Promise<void>{
        await this.app.start()
        await this.waitForURLReachable(`${this.app.getBaseUrl()}/test-connection`)
        this.api = axios.create({ baseURL: this.app.getBaseUrl() })
    }

    public stopServer(): void{
        this.app.stop()
    }

    public getApi(): AxiosInstance{
        return this.api!!
    }
}