import { appContainer } from "../../../src/config/dependency/Container"
import { TYPES } from "../../../src/config/dependency/types"
import { System } from "../../../src/config/system/System"
import { DataBaseService } from "../../../src/database/DataBaseService"



describe('GET /auth/login', function() {
    const db = appContainer.get<DataBaseService>(TYPES.DataBaseService)
    const system = appContainer.get<System>(TYPES.System)

    before(async() => {
        await system.init()
        await db.init()
    })
    
    beforeEach(async() => {
        await db.build()
    })

    after(async() => {
        await db.closeConnection()
    })


    it('When given valid username and valid password, then return 200 with token and userid',
    async function() {
        
    })
})
