import axios, { AxiosInstance } from "axios"
import { expect } from "chai"
import { User } from "../../../src/models/User"
import { TestDataBase } from "../TestDataBase"
import { TestServer } from "../TestServer"

describe('GET /auth/login', function() {

    var testServer: TestServer
    var testDataBase: TestDataBase
    var api: AxiosInstance
    var path = "/auth/login"

    beforeEach(async function(){
        testServer = new TestServer()
        await testServer.startServer()
        api = testServer.getApi()
    })

    afterEach(async function() {
        await testServer.stopServer()
    })
    
    it('responds with 200 when correct auth data', async function() {
        let registerResponse = await api.post("/auth/register", 
            {id: "abc", login: "user", password: "pass", firstName: "firstName", lastName: "lastname"})
        expect(registerResponse).to.have.property('status', 201)
        var loginResponse = await api.get("/auth/login", {headers: {login: "user", password: "pass"}})
        expect(loginResponse).to.have.property('status', 200)
        
    })
})