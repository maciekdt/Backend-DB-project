import { inject, injectable } from "inversify";
import { DataTypes } from "sequelize";
import { DataBaseService } from "../../database/DataBaseService";
import { User } from "../../models/User";
import { TYPES } from "../dependency/types";



export interface DataBaseBuilder {
    build(): Promise<void>
}

@injectable()
export class SequalizeBuilder implements DataBaseBuilder {
    constructor(
        @inject(TYPES.DataBaseService) private service: DataBaseService
    ){}

    public async build(): Promise<void> {
        this.initTables()
        await this.initSchema()
    }


    private async initSchema(): Promise<void>{
        await User.sync({ force: true })
    }

    private initTables(): void {
        User.init(
            {
                id: {
                    type: DataTypes.STRING,
                    primaryKey: true
                },
                login: { 
                    type: DataTypes.STRING
                },
                password: {
                    type: DataTypes.STRING
                },
                firstName: {
                    type: DataTypes.STRING
                },
                lastName: {
                    type: DataTypes.STRING
                }
            },
            { 
                tableName: 'Users',
                sequelize: this.service.getClient()
        })
    }

}