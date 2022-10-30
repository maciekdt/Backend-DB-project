import fs from 'fs/promises'
import { injectable } from 'inversify'

export interface FileRepo{
    readFileAsString(filePath: string): Promise<string>,
    readFileAsObject<T>(filePath: string): Promise<T>
}

@injectable()
export class FileRepoFs implements FileRepo{
    public async readFileAsString(filePath: string): Promise<string> {
        return await fs.readFile(filePath, "utf8")
    }
    public async readFileAsObject<T>(filePath: string): Promise<T> {
        return JSON.parse(await fs.readFile(filePath, "utf8")) as T
    }
    
}