import axios, { AxiosInstance } from "axios"
import { expect } from "chai"
import { TestServer } from "../TestServer"

describe('GET /auth/login', function() {

    var testServer: TestServer
    var api: AxiosInstance
    var path = "/auth/login"

    before(async function(){
        testServer = new TestServer()
        await testServer.startServer()
        api = testServer.getApi()
    })

    after(async function() {
        await testServer.stopServer()
    })
    
    it('responds with 200 when correct auth data', async function() {
        var response = await api.get("/auth/login", {headers: {login: "maciek2", password: "pass"}})
        expect(response).to.have.property('status', 200)
        
    })
})