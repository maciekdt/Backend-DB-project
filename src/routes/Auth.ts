import express, { Router, Request, Response, NextFunction} from "express"
//import {AuthTools, AuthToolsI} from '../controllers/auth/AuthTools'

const router: Router = express.Router()

router.use((req, res, next) => {
	next()
})

router.use('/auth/login', (req, res, next) => {
	next()
})

router.use('/auth/register', (req, res, next) => {
	next()
})

module.exports = router