import { appContainer } from "../../src/config/dependency/Container";
import { TYPES } from "../../src/config/dependency/types";
import { DataBaseContext } from "../../src/database/DataBaseContext";
import { User } from "../../src/models/User";

export class TestDataBase {
    private database = appContainer.get<DataBaseContext>(TYPES.DataBaseContext)

    public async start(): Promise<void>{
        
        await this.database.connect()
        await this.database.build()
    }
}