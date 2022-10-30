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
        when(mockedSystemConfigProvider.getSystemConfig())
            .thenReturn({ privateKeyPath: keyFilePath } as SystemConfig)

        mockedFileRepo = mock<FileRepo>()
        when(mockedFileRepo.readFileAsString(keyFilePath))
            .thenReturn(Promise.resolve(key))
    })


    it('getSecretKey first time', async function() {
        //arange
        const sut = new KeyFromTextFile(
            instance(mockedSystemConfigProvider),
            instance(mockedFileRepo)
        ) 
        
        //act
        let result = await sut.getSecretKey()
        
        //assert
        expect(result).equal(key)
    })

    it('getSecretKey nth time', async function() {
        //arange
        const sut = new KeyFromTextFile(
            instance(mockedSystemConfigProvider),
            instance(mockedFileRepo)
        ) 
        
        //act
        for(let i=0; i<4; i++)
            await sut.getSecretKey()
        let result = await sut.getSecretKey()
        
        //assert
        expect(result).equal(key)
        verify(mockedFileRepo.readFileAsString(keyFilePath)).once()
    })
})