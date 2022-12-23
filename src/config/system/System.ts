import { inject, injectable } from "inversify";
import { DataBaseService } from "../../database/DataBaseService";
import { TYPES } from "../dependency/types";
import { SystemConfigProvider } from "./SystemConfigProvider";

export interface System {
    init(): Promise<void[]>
}


@injectable()
export class SystemImpl implements System {

    constructor(
        @inject(TYPES.DataBaseService) private dbService: DataBaseService
    ){}

    public async init(): Promise<void[]> {
        let syncTasks: (() => void)[] = [

        ]
        syncTasks.forEach((task) => {task()})

        let asyncTasks: Promise<void>[] = [
            this.dbService.connect()
        ]
        return await Promise.all(asyncTasks)
    }
}