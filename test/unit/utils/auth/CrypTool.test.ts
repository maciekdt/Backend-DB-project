import { expect } from 'chai'
import { instance, mock, when } from 'ts-mockito'
import { ICrypTool, CrypTool } from '../../../../src/utils/auth/CrypTool'
import { IKeyProvider, KeyProvider } from '../../../../src/utils/auth/KeyProvider'

const validPrivateKey = 
`-----BEGIN PRIVATE KEY-----
MIIBPAIBAAJBALciWIiZUI9c6LUCPr6CyUx7ewzXVKIs6NnZbQp97AzYTMaBvkPW
QLZVOZ9xKGMobkK2nDlOKjUtNKG/geTsNMUCAwEAAQJBAJ/nlXZwqC8F6QtkEnU2
rZ3ik+b6fiO9IvRVLSjkGqB7HuwyvonRlqwa4eh48iuJpRtwqnu3zuhv5jNqQmjb
/GECIQD7j/fxywajZOVTIS0XhspxixpW17I5OAt18kmxeHdsbwIhALpdXLEuHlAP
QYbHJ9onpodp0JF8Od4E+ZhyndYQfDQLAiEAgoMZ3v83LXQ+KdfPfiI3S5sgiieT
1m3GPGX8Z6+ZPc8CIC5J/jnr8I+GGop1cQqYip5bw/g+2Miyh6Q748RFt/PdAiEA
+DbIGsbAdAD6j8Y4cGkk0GZKYfG2nlM3pcbKCj4yzd4=
-----END PRIVATE KEY-----`

describe('Tests for CrypTool class', function() {
    it('encodePassword and comparePassword when the same password', async function() {
        //arange
        const pass = "ABCDEF"
        let mockedKeyProvider:IKeyProvider = mock(KeyProvider)
        const sut: ICrypTool = new CrypTool(instance(mockedKeyProvider))
        
        //act
        let encodedPass = await sut.encodePassword(pass)
        let result = await sut.comparePassword(pass, encodedPass)
        
        //assert
        let expected = true
        expect(result).equal(expected)
    })

    it('encodePassword and comparePassword when not the same password', async function() {
        //arange
        const pass = "ABCDEF"
        const otherPass = "FEDCBA"

        let mockedKeyProvider:IKeyProvider = mock(KeyProvider)
        const sut: ICrypTool = new CrypTool(instance(mockedKeyProvider))
        
        //act
        let encodedPass = await sut.encodePassword(pass)
        let result = await sut.comparePassword(otherPass, encodedPass)
        
        //assert
        let expected = false
        expect(result).equal(expected)
    })

    it('generateTokenForUser and verifyTokenForUser when valid token and valid userId', async function() {
        //arange
        const userId = "user1"

        let mockedKeyProvider:IKeyProvider = mock(KeyProvider)
        when(mockedKeyProvider.getSecretKey()).thenReturn(Promise.resolve(validPrivateKey))
        const sut: ICrypTool = new CrypTool(instance(mockedKeyProvider))
        
        //act
        let token = await sut.generateTokenForUser(userId)
        let result = await sut.verifyTokenForUser(userId, token)
        
        //assert
        let expected = true
        expect(result).equal(expected)
    })

    it('generateTokenForUser and verifyTokenForUser when valid token and invalid userId', async function() {
        //arange
        const userId = "user1"
        const otherUserId = "user2"

        let mockedKeyProvider:IKeyProvider = mock(KeyProvider)
        when(mockedKeyProvider.getSecretKey()).thenReturn(Promise.resolve(validPrivateKey))
        const sut: ICrypTool = new CrypTool(instance(mockedKeyProvider))
        
        //act
        let token = await sut.generateTokenForUser(userId)
        let result = await sut.verifyTokenForUser(otherUserId, token)
        
        //assert
        let expected = false
        expect(result).equal(expected)
    })

    it('verifyTokenForUser when invalid token', async function() {
        //arange
        const userId = "user1"
        const token = "ABCDEFG"

        let mockedKeyProvider:IKeyProvider = mock(KeyProvider)
        when(mockedKeyProvider.getSecretKey()).thenReturn(Promise.resolve(validPrivateKey))
        const sut: ICrypTool = new CrypTool(instance(mockedKeyProvider))
        
        //act
        let result = await sut.verifyTokenForUser(userId, token)
        
        //assert
        let expected = false
        expect(result).equal(expected)
    })
})