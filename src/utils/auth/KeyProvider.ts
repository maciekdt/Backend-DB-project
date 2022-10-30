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

    public async getSecretKey(): Promise<string> {
        await this.lock.wait()
        if(this.secretKeyCache == null){
            let secretKey =  await this.fileRepo.readFileAsString(
                this.system.getSystemConfig().privateKeyPath)
            this.secretKeyCache = secretKey
            this.lock.signal()
            return secretKey
        }
        else{
            this.lock.signal()
            return Promise.resolve(this.secretKeyCache as string)
        }
    }
}
