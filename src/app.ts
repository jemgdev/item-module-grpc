import * as grpc from '@grpc/grpc-js'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import ResponseModel from './utils/standar-response/response.model'
import { ResponseCodes } from './utils/standar-response/response.codes'
import { ResponseStatusCodes } from './utils/standar-response/response.status.codes'
import notFound from './middlewares/notFound'
import responseError from './middlewares/responseError'
import itemRouter from './routes/item.routes'
import grpcClient from './grpc.client'
import { CreationResponse } from './proto/creationPackage/CreationResponse'
import CreateItemUseCase from './item/application/create.item.usecase'
import ItemPrismaRepository from './item/infrastructure/item.prisma.repository'
dotenv.config()

const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.set('PORT', process.env.PORT ?? 3001)

const home = async (_request: Request, response: Response): Promise<void> => {
  new ResponseModel({
    statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
    code: ResponseCodes.SUCCESS_REQUEST,
    message: 'Welcome to AgroCredito API v1.'
  }).send(response)
}

app.get('/', home)

app.use('/api/v1/items', itemRouter)

app.use(notFound)
app.use(responseError)

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on port ${String(app.get('PORT'))}`)
})

const metadata = new grpc.Metadata()
metadata.set('moduleName', 'itemModule')
const call = grpcClient.CreateItem(metadata)

call.write({
  message: 'item Module connected'
})

call.on('data', async (chunk: CreationResponse) => {
  const { userId } = chunk
  const itemPrismaRepository = new ItemPrismaRepository()
  const createItemUseCase = new CreateItemUseCase(itemPrismaRepository)

  await createItemUseCase.create({ userId: userId! })
})

call.on('error', (error) => {
  console.error(error.message)
})
