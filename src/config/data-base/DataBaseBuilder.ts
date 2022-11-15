import { inject, injectable } from "inversify";
import { DataTypes } from "sequelize";
import { DataBaseService } from "../../database/DataBaseService";
import { User } from "../../models/User";
import { TYPES } from "../dependency/types";



export interface DataBaseBuilder {
    build(): Promise<void>
}

@injectable()
export class SequalizeBuilder implements DataBaseBuilder {
    constructor(
        @inject(TYPES.DataBaseService) private service: DataBaseService
    ){}

    public async build(): Promise<void> {
        await User.sync({ force: true })
    }
    

}