import { NextFunction, Request, Response } from 'express'
import ResponseModel from '../utils/standar-response/response.model'
import { ResponseStatusCodes } from '../utils/standar-response/response.status.codes'
import { ResponseCodes } from '../utils/standar-response/response.codes'
import ItemPrismaRepository from '../item/infrastructure/item.prisma.repository'
import ListItemsUseCase from '../item/application/list.items.usecase'

const userRepository = new ItemPrismaRepository()
const listItemsUseCase = new ListItemsUseCase(userRepository)

export const listItemsHandler = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const items = await listItemsUseCase.list()

    new ResponseModel({
      statusCode: ResponseStatusCodes.SUCCESS_REQUEST,
      code: ResponseCodes.SUCCESS_REQUEST,
      message: 'Items found',
      data: items
    }).send(response)
  } catch (error) {
    next(error)
  }
}