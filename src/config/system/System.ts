import { inject, injectable } from "inversify";
import { DataBaseContext } from "../../database/DataBaseContext";
import { TYPES } from "../dependency/types";
import { SystemConfigProvider } from "./SystemConfigProvider";

export interface System {
    init(): Promise<void[]>
}


@injectable()
export class SystemImpl implements System {

    constructor(
        @inject(TYPES.DataBaseContext) private dbService: DataBaseContext
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