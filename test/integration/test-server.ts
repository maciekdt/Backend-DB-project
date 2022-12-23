import axios from "axios"
import { ChildProcessWithoutNullStreams, spawn } from "child_process"
import { Application } from "express"
import { env } from "process"
import { App } from "../../src/app/App"
import { appContainer } from "../../src/config/dependency/Container"
import { TYPES } from "../../src/config/dependency/types"

const app:App = appContainer.get(TYPES.App)

async function spawnServer() {
        const server = spawn('ts-node', ["./src/index.js"])
        server.stdout.pipe(process.stdout)
        server.stderr.pipe(process.stderr)
        await waitForURLReachable(`${app.getBaseUrl()}/test-connection`)
        return server
}

async function waitForURLReachable(url: string, timeout: number = 1000000): Promise<boolean> {
    const timeoutThreshold = Date.now() + timeout
    while (true) {
        try {
            await axios.get(url)
            return true
        } catch (err) {
            if (Date.now() > timeoutThreshold) {
                throw new Error(`URL ${url} not reachable after ${timeout}ms`)
            }
            await new Promise(resolve => setTimeout(resolve, 100))
        }
    }
}


export function useInTest() {
    var testServer: ChildProcessWithoutNullStreams
    before(async function startTestServer() {
        testServer = await spawnServer()
        const api = axios.create({ baseURL: app.getBaseUrl() })
        this.testServer = testServer
        this.api = api
    })
    after(function stopTestServer(): Promise<void> {
        if(!testServer.kill())
            throw new Error(`Not able to kill test server`)
        return new Promise<void>(resolve =>
            testServer.on('close', () => resolve())
        )
    })
}