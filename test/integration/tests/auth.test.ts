import axios, { AxiosInstance } from "axios"
import { expect } from "chai"
import { User } from "../../../src/models/User"
import { TestDataBase } from "../TestDataBase"
import { TestServer } from "../TestServer"

describe('GET /auth/login', function() {

    var testServer = new TestServer()
    var testDataBase = new TestDataBase()
    var api: AxiosInstance

    beforeEach(async function(){
        await testServer.startServer()
        await testDataBase.start()
        api = testServer.getApi()
    })

    afterEach(function() {
        testServer.stopServer()
    })
    

    it('responds with 200 when correct auth data', async function() {
        //arange
        await User.build({
            id: "abc",
            firstName: "firstName", 
            lastName: "lastName", 
            password: "$2b$10$NgumWjaZ2NZRXXE.Hj4ycuAHH8gvXUkW4euRjBTR21BkcQci31xiy", //=pass
            login:"user"}).save()
        
        //act
        var loginResponse = await api.get("/auth/login", {headers: {login: "user", password: "pass"}})

        //assert
        expect(loginResponse).to.have.property('status', 200)
        expect(loginResponse.data).to.have.property('token')
        expect(loginResponse.data).to.have.property('userId', "abc")
    })


    it('responds with 401 when incorrect password', async function() {
        //arange
        await User.build({
            id: "id",
            firstName: "firstName", 
            lastName: "lastName", 
            password: "$2b$10$NgumWjaZ2NZRXXE.Hj4ycuAHH8gvXUkW4euRjBTR21BkcQci31xiy", //=pass
            login:"user"}).save()
        
        //act
        var loginResponse = await api.get("/auth/login", {headers: {login: "user", password: "passsss"}, 
            validateStatus: function (status) { return status == 401 }})

        //assert
        expect(loginResponse).to.have.property('status', 401)
    })


    it('responds with 401 when incorrect login', async function() {
        //arange
        await User.build({
            id: "id",
            firstName: "firstName", 
            lastName: "lastName", 
            password: "$2b$10$NgumWjaZ2NZRXXE.Hj4ycuAHH8gvXUkW4euRjBTR21BkcQci31xiy", //=pass
            login:"user"}).save()
        
        //act
        var loginResponse = await api.get("/auth/login", {headers: {login: "userrrr", password: "pass"}, 
            validateStatus: function (status) { return status == 401 }})

        //assert
        expect(loginResponse).to.have.property('status', 401)
    })
})