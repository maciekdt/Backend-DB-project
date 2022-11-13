import { expect } from 'chai'
import { anyString, instance, mock, verify, when } from 'ts-mockito'
import { SystemConfig } from '../../../../src/config/system/SystemConfig'
import { SystemConfigFromJson, SystemConfigProvider } from '../../../../src/config/system/SystemConfigProvider'
import { CrypTool, CrypToolImplementation  } from '../../../../src/utils/auth/CrypTool'
import { KeyProvider, KeyFromTextFile } from '../../../../src/utils/auth/KeyProvider'
import { FileRepo, FileRepoFs } from '../../../../src/utils/files/FileRepo'



describe('Tests for KeyProvider class', function() {

    let mockedSystemConfigProvider: SystemConfigProvider
    let mockedFileRepo: FileRepo
    const key = "ABCDEFG"
    const keyFilePath = "abc/cde/fg" 

    beforeEach(function(){
        mockedSystemConfigProvider = mock<SystemConfigProvider>()
        mockedFileRepo = mock<FileRepo>()
    })


    it('getSecretKey when called first time, then return key',
    async function() {
        //arange
        when(mockedSystemConfigProvider.getSystemConfig())
            .thenReturn(Promise.resolve({ privateKeyPath: keyFilePath } as SystemConfig))
        when(mockedFileRepo.readFileAsString(keyFilePath))
            .thenReturn(Promise.resolve(key))
        const sut = new KeyFromTextFile(
            instance(mockedSystemConfigProvider),
            instance(mockedFileRepo)
        ) 
        //act
        let result = await sut.getSecretKey()
        //assert
        expect(result).equal(key)
    })


    it('getSecretKey when called nth time, then return key and call FileRepo.readFileAsString once',
    async function() {
        //arange
        when(mockedSystemConfigProvider.getSystemConfig())
            .thenReturn(Promise.resolve({ privateKeyPath: keyFilePath } as SystemConfig))
        when(mockedFileRepo.readFileAsString(keyFilePath))
            .thenReturn(Promise.resolve(key))
        const sut = new KeyFromTextFile(
            instance(mockedSystemConfigProvider),
            instance(mockedFileRepo)
        ) 
        //act
        sut.getSecretKey()
        sut.getSecretKey()
        sut.getSecretKey()
        sut.getSecretKey()
        let result = await sut.getSecretKey()
        //assert
        expect(result).equal(key)
        verify(mockedFileRepo.readFileAsString(keyFilePath)).once()
    })


    it('getSecretKey when fileRepo throws Error once, then return key on next call',
    async function() {
        //arange
        when(mockedSystemConfigProvider.getSystemConfig())
            .thenReturn(Promise.resolve({ privateKeyPath: keyFilePath } as SystemConfig))
        when(mockedFileRepo.readFileAsString(keyFilePath))
            .thenThrow(new Error("Test error"))
            .thenReturn(Promise.resolve(key))
        const sut = new KeyFromTextFile(
            instance(mockedSystemConfigProvider),
            instance(mockedFileRepo)
        ) 
        //act
        try{ await sut.getSecretKey() }
        catch(err) { }
        let result = await sut.getSecretKey()
        //assert
        expect(result).equal(key)
    })
})