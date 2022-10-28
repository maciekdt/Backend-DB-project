import { injectable } from "inversify"
import fs from 'fs'
import { SystemConfig } from "./SystemConfig"

export interface SystemConfigProvider{
    init(): Promise<void>,
    getSystemConfig(): SystemConfig
}

@injectable()
export class SystemConfigFromJson implements SystemConfigProvider{

    private configFilePath = "config.json"
    private systemConfig: SystemConfig|null = null
    
    public async init(): Promise<void> {
        this.systemConfig = JSON.parse(await fs
            .promises
            .readFile(this.configFilePath, "utf8"))
    }

    public getSystemConfig(): SystemConfig {
        if(this.systemConfig != null)
            return this.systemConfig as SystemConfig
        else throw new Error()
    }
    
}