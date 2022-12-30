import { inject, injectable } from "inversify"
import { DataTypes, Sequelize } from "sequelize"
import { TYPES } from "../config/dependency/types"
import { SystemConfigProvider } from "../config/system/SystemConfigProvider"
import { User } from "../models/User"
import SQLite from 'sqlite3'


export interface DataBaseService{
    connect(): Promise<void>
    build(): Promise<void>
    closeConnection(): Promise<void>
    getClient(): Sequelize
}


@injectable()
export class SequalizeService implements DataBaseService{
    constructor(
        @inject(TYPES.SystemConfigProvider) private system: SystemConfigProvider
    ){}

    private client: Sequelize|null = null


    public async connect(): Promise<void> {
        let config = (await this.system.getSystemConfig()).dbConfig
        this.client = new Sequelize(
            config.name, 
            config.user, 
            (config.pass == null) ? undefined : config.pass, 
            {
                dialect: config.options.dialect,
                storage: (config.options.storage == null) ? undefined : config.options.storage,
                host: (config.options.host == null) ? undefined : config.options.host,
            }
        )
        await this.client.authenticate()
        this.initTables()
    }

    public async build(): Promise<void> {
        await this.getClient().sync({ force: true })
    }

    public async closeConnection(): Promise<void> {
        this.getClient().close()
    }

    public getClient(): Sequelize {
        return this.client as Sequelize
    }

    
    private initTables(): void {
        User.init(
            {
                id:{
                    type: DataTypes.STRING,
                    primaryKey: true
                },
                login: { 
                    type: DataTypes.STRING,
                    unique: true
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
                sequelize: this.client as Sequelize,
                timestamps: false
        })
    }
}