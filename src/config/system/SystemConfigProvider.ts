import { inject, injectable } from "inversify"
import fs from 'fs'
import { SystemConfig } from "./SystemConfig"
import { TYPES } from "../dependency/types"
import { FileRepo } from "../../utils/files/FileRepo"
import Semaphore from "semaphore-async-await"

export interface SystemConfigProvider{
    getSystemConfig(): Promise<SystemConfig>
}

@injectable()
export class SystemConfigFromJson implements SystemConfigProvider{

    constructor(@inject(TYPES.FileRepo) private fileRepo: FileRepo){}

    private filepath = "system.config.json"
    private cache: SystemConfig|null = null
    private lock = new Semaphore(1)
    

    public async getSystemConfig(): Promise<SystemConfig> {
        if(this.cache != null)
            return this.cache as SystemConfig
        return await this.getSysytemConfigFromFile()
    }

    private async getSysytemConfigFromFile(): Promise<SystemConfig>{
        await this.lock.wait()
        if(this.cache == null){
            try {
                let data: SystemConfig = await this.fileRepo
                    .readFileAsObject(this.filepath)
                this.cache = data
                this.lock.signal()
                return data
            }
            finally { this.lock.signal() }
        }
        else{
            this.lock.signal()
            return this.cache as SystemConfig
        }
    }
}