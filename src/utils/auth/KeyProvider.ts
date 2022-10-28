import { inject, injectable } from "inversify"
import fs from 'fs'
import { TYPES } from "../../config/dependency/types"
import { SystemConfigProvider } from "../../config/system/SystemConfigProvider"

export interface KeyProvider{
    getSecretKey(): Promise<string>
}

@injectable()
export class KeyFromTextFile implements KeyProvider{

    constructor(@inject(TYPES.SystemConfigProvider) private system: SystemConfigProvider){}

    private secretKeyCache: string|null = null

    public async getSecretKey(): Promise<string> {
        if(this.secretKeyCache == null){
            let secretKey =  await fs
                .promises
                .readFile(this.system.getSystemConfig().privateKeyPath, "utf8")
            this.secretKeyCache = secretKey
            return secretKey
        }
        else
            return Promise.resolve(this.secretKeyCache as string)
    }
}