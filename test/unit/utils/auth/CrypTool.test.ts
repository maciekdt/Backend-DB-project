import { expect } from 'chai'
import { ICrypTool, CrypTool } from '../../../../src/utils/auth/CrypTool'


describe('Tests for CrypTool class', function() {

    it('encodePassword and comparePassword when the same password', async function() {
        //arange
        const pass = "ABCDEF"
        const sut: ICrypTool = new CrypTool()
        
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
        const sut: ICrypTool = new CrypTool()
        
        //act
        let encodedPass = await sut.encodePassword(pass)
        let result = await sut.comparePassword(otherPass, encodedPass)
        
        //assert
        let expected = false
        expect(result).equal(expected)
    })
})