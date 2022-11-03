import { inject, injectable } from "inversify"
import { TYPES } from "../../config/dependency/types"
import { SystemConfigProvider } from "../../config/system/SystemConfigProvider"
import { FileRepo } from "../files/FileRepo"
import Semaphore from 'semaphore-async-await'

export interface KeyProvider{
    getSecretKey(): Promise<string>
}

@injectable()
export class KeyFromTextFile implements KeyProvider{

    constructor(
        @inject(TYPES.SystemConfigProvider) private system: SystemConfigProvider,
        @inject(TYPES.FileRepo) private fileRepo: FileRepo
    ){}

    private secretKeyCache: string|null = null
    private lock = new Semaphore(1)

    public async getSecretKey(): Promise<string>{
        if(this.secretKeyCache != null)
            return this.secretKeyCache as string
        return await this.getKeyfromFile()
        
    }

    private async getKeyfromFile(): Promise<string>{
        await this.lock.wait()
        if(this.secretKeyCache == null){
            try {
                let secretKey =  await this.fileRepo.readFileAsString(
                    this.system.getSystemConfig().privateKeyPath)
                this.secretKeyCache = secretKey
                this.lock.signal()
                return secretKey
            }
            finally { this.lock.signal() }
        }
        else{
            this.lock.signal()
            return this.secretKeyCache as string
        }
    }
}
