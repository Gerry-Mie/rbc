import {Router } from 'express'
import member from '../member/member.controller'

const router = Router()

router.use('/member', member)

export default router
