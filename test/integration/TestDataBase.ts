import { appContainer } from "../../src/config/dependency/Container";
import { TYPES } from "../../src/config/dependency/types";
import { DataBaseService } from "../../src/database/DataBaseService";
import { User } from "../../src/models/User";

export class TestDataBase {
    private database = appContainer.get<DataBaseService>(TYPES.DataBaseService)

    public async start(): Promise<void>{
        
        await this.database.connect()
        await this.database.build()
    }

    public async fillWithTestData(){
        await User.build({
            id: "id",
            firstName: "firstName", 
            lastName: "lastName", 
            password: "pass", 
            login:"user"}).save()
    }
}