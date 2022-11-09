import { inject, injectable } from "inversify"
import { DataTypes, Sequelize } from "sequelize"
import { TYPES } from "../config/dependency/types"
import { SystemConfigProvider } from "../config/system/SystemConfigProvider"


export interface DataBaseService{
    connect(): void
    getClient(): Sequelize
    testConnection(): Promise<void>
}

@injectable()
export class SequalizeService implements DataBaseService{
    constructor(
        @inject(TYPES.SystemConfigProvider) private system: SystemConfigProvider
    ){}

    private client: Sequelize|null = null

    public connect(): void {
        let config = this.system.getSystemConfig().db
        this.client = new Sequelize(config.name,  config.user, config.pass, {
            dialect: "mysql",
            host: 'localhost'
        })
    }

    public getClient(): Sequelize {
        return this.client as Sequelize
    }


    public async testConnection(): Promise<void> {
        await (this.client as Sequelize).authenticate()
    }
    
}