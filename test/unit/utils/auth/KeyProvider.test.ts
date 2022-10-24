import { expect } from 'chai'
import { instance, mock, when } from 'ts-mockito'
import { ICrypTool, CrypTool } from '../../../../src/utils/auth/CrypTool'
import { IKeyProvider, KeyProvider } from '../../../../src/utils/auth/KeyProvider'

const validPrivateKey = 
`-----BEGIN PRIVATE KEY-----
MIIBOAIBAAJAXke34l+3tIm6Vh5j87aAcsSMYQMTTRikkaIgS+/S1yZRE4CLzab3
8jaKK6JUqWNdxGwPAJXj+JWMloHoQswEawIDAQABAkAAufq/ws8OlBUcfsV0Zk6d
E8ilIrnuWSdDfAVVsHZmdAG5+i8IZDBVSR6TvJ0bWonlYHqYwMnWwADpR1HcWXbR
AiEAq5CO4LRSXpTT1lrck2mXpiaXfOvFQBr5bj4fXDFbmDMCIQCMrhQicWyQgae2
7hPmx1Nyt35n43KOzv0dMDhmuRGK6QIgaVwaUmaK2yi8uzwLj7/d8JxslbvY49hs
68XczmpFXL8CIFtsLY2MpH7so2+QHMLXOnXMpYsiFqqT/Y3gbmbjUnExAiBwNA0n
P8v2mSqClmeilwIX51cTv9cZpjscTuAYcOehmQ==`

describe('Tests for KeyProvider class', function() {
    it('getSecretKey for test file', async function() {
        //arange
        const expected = validPrivateKey
        const keyFilePath = "res/secret/private_test.key"
        const sut: KeyProvider = new KeyProvider()
        
        //act
        let result = await sut.getSecretKey(keyFilePath)
        
        //assert
        expect(result).equal(expected)
    })
})