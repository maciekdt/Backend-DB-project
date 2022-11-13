import { inject, injectable } from "inversify"
import fs from 'fs'
import { SystemConfig } from "./SystemConfig"
import { TYPES } from "../dependency/types"
import { FileRepo } from "../../utils/files/FileRepo"

export interface SystemConfigProvider{
    init(): Promise<void>,
    getSystemConfig(): SystemConfig
}

@injectable()
export class SystemConfigFromJson implements SystemConfigProvider{

    constructor(@inject(TYPES.FileRepo) private fileRepo: FileRepo){}

    private configFilePath = "system.config.json"
    private systemConfig: SystemConfig|null = null
    
    public async init(): Promise<void> {
        this.systemConfig = await this.fileRepo.readFileAsObject<SystemConfig>(this.configFilePath)
        console.log('Sysytem configuration loaded')
    }

    public getSystemConfig(): SystemConfig {
        if(this.systemConfig != null)
            return this.systemConfig as SystemConfig
        else throw new Error()
    }
    
}