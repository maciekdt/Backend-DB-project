import { expect } from 'chai'
import { mock, instance, when } from 'ts-mockito'
import { AuthControllerImplementation} from "../../../src/controllers/Auth"
import { CrypTool, CrypToolImplementation  } from '../../../src/utils/auth/CrypTool'



describe('Tests for AuthController class', function() {

    /*it('checking default options', async function() {
        //arange
        const pass = "ABCDEF"
        const encodedPass = "FEDCBA"

        let mockedCrypTool:ICrypTool = mock(CrypTool)
        when(mockedCrypTool.encodePassword(pass)).thenReturn(Promise.resolve(encodedPass))

        const sut = new AuthController(instance(mockedCrypTool))
        
        //act
        let expected = encodedPass
        let result = await sut.getHash(pass)
        
        //assert
        expect(result).equal(expected)
    })*/

})
