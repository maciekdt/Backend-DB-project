import { inject, injectable } from "inversify"
import { DataTypes, Sequelize } from "sequelize"
import { TYPES } from "../config/dependency/types"
import { SystemConfigProvider } from "../config/system/SystemConfigProvider"


export interface DataBaseService{
    connect(): Promise<void>
    getClient(): Sequelize
}

@injectable()
export class SequalizeService implements DataBaseService{
    constructor(
        @inject(TYPES.SystemConfigProvider) private system: SystemConfigProvider
    ){}

    private client: Sequelize|null = null

    public async connect(): Promise<void> {
        let config = (await this.system.getSystemConfig()).db
        this.client = new Sequelize(config.name,  config.user, config.pass, {
            dialect: "mysql",
            host: 'localhost'
        })
        await (this.client as Sequelize).authenticate()
        console.log("Connected to the database")
    }

    public getClient(): Sequelize {
        return this.client as Sequelize
    }    
}