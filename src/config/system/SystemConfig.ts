import { Dialect, Options } from "sequelize"

export interface SystemConfig {
    privateKeyPath: string
    dbConfig: {
        pass: string|null
        user: string
        name: string
        options: {
            host: string|null
            dialect: Dialect
            storage: string|null
        }
    }
}