import { Router } from 'express'
import { listItemsHandler } from '../controller/item.controller'
const itemRouter = Router()

itemRouter.get('/', listItemsHandler)

export default itemRouter