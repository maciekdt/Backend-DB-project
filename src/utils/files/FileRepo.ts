import fs from 'fs/promises'
import { injectable } from 'inversify'
import { InternalServerError } from '../../models/exceptions/Exceptions'

export interface FileRepo{
    readFileAsString(filePath: string): Promise<string>,
    readFileAsObject<T>(filePath: string): Promise<T>
}

@injectable()
export class FileRepoFs implements FileRepo{
    public async readFileAsString(filePath: string): Promise<string> {
        try { return await fs.readFile(filePath, "utf8") } 
        catch(err) { throw err as InternalServerError }
    }
    public async readFileAsObject<T>(filePath: string): Promise<T> {
        try { return JSON.parse(await fs.readFile(filePath, "utf8")) as T }
        catch(err) { throw err as InternalServerError }
    }
    
}