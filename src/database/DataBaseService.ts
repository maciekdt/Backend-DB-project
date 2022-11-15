import { inject, injectable } from "inversify"
import { DataTypes, Sequelize } from "sequelize"
import { TYPES } from "../config/dependency/types"
import { SystemConfigProvider } from "../config/system/SystemConfigProvider"
import { User } from "../models/User"


export interface DataBaseService{
    init(): Promise<void>
    getClient(): Sequelize
}


@injectable()
export class SequalizeService implements DataBaseService{
    constructor(
        @inject(TYPES.SystemConfigProvider) private system: SystemConfigProvider
    ){}

    private client: Sequelize|null = null


    public async init(): Promise<void> {
        await this.connect()
        this.initTables()
    }


    public getClient(): Sequelize {
        return this.client as Sequelize
    }


    private async connect(): Promise<void> {
        let config = (await this.system.getSystemConfig()).db
        this.client = new Sequelize(config.name,  config.user, config.pass, {
            dialect: "mysql",
            host: 'localhost'
        })
        await this.client.authenticate()
        console.log("Connected to the database")
    }

    
    private initTables(): void {
        User.init(
            {
                login: { 
                    type: DataTypes.STRING,
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