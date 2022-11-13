import { inject, injectable } from "inversify";
import { DataBaseService } from "../../database/DataBaseService";
import { TYPES } from "../dependency/types";
import { SystemConfigProvider } from "./SystemConfigProvider";

export interface System {
    init(): Promise<void>
}


@injectable()
export class SystemImpl implements System {

    constructor(
        @inject(TYPES.DataBaseService) private dbService: DataBaseService,
        @inject(TYPES.SystemConfigProvider) private systemConfigProvider: SystemConfigProvider
    ){}

    public async init(): Promise<void> {
        await this.systemConfigProvider.init()
        await this.dbService.connect()
    }
}