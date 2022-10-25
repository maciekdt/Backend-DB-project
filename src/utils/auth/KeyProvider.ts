import { injectable } from "inversify"
import fs from 'fs'

export interface IKeyProvider{
    getSecretKey(): Promise<string>
}

@injectable()
export class KeyProvider implements IKeyProvider{

    private static secretKeyCache: string|null = null
    private keyFilePath = "res/secret/private.key"

    public async getSecretKey(filePath: string = this.keyFilePath): Promise<string> {
        if(KeyProvider.secretKeyCache == null){
            let secretKey =  await fs
                .promises
                .readFile(filePath, "utf8")
            KeyProvider.secretKeyCache = secretKey
            return secretKey
        }
        else
            return Promise.resolve(KeyProvider.secretKeyCache as unknown as string)
    }
}