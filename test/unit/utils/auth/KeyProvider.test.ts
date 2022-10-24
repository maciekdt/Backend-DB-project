import { expect } from 'chai'
import { instance, mock, when } from 'ts-mockito'
import { ICrypTool, CrypTool } from '../../../../src/utils/auth/CrypTool'
import { IKeyProvider, KeyProvider } from '../../../../src/utils/auth/KeyProvider'


describe('Tests for KeyProvider class', function() {
    it('getSecretKey for test file', async function() {
        //arange
        const expected = "ABCDEF"
        const fakeKeyFilePath = "res/secret/private_test.key"
        const sut = new KeyProvider()
        
        //act
        let result = await sut.getSecretKey(fakeKeyFilePath)
        
        //assert
        expect(result).equal(expected)
    })
})