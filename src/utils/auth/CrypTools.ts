import bcrypt from 'bcrypt'

export interface CrypToolsI{
	generateTokenForUser: (userId: string) => Promise<string>,
	validateTokenForUser: (userId: string, token: string) => Promise<boolean>,
	encodePassword: (pass: string) => Promise<string>,
	comparePassword: (pass: string, encryptedPass: string) => Promise<boolean>
}

const saltRounds = 1
export let CrypTools: CrypToolsI = {
	generateTokenForUser: function (userId){
		throw new Error("Function not implemented.")
	},

	validateTokenForUser: function (userId, token){
		throw new Error("Function not implemented.")
	},

	encodePassword: async function (pass){
		return bcrypt
			.hash(pass, saltRounds)
	}, 

	comparePassword: async function (pass, encryptedPass){
		return bcrypt
      .compare(pass, encryptedPass)
	}
}
