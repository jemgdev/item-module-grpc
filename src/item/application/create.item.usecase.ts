import BadRequestError from "../../utils/custom-errors/application-errors/bad.request.error"
import ItemPersistanceRepository from "../domain/item.persistance.repository"

export default class CreateItemUseCase {
  constructor (private readonly itemPersistanceRepository: ItemPersistanceRepository) {}

  async create ({ userId }: { userId: string }) {
    if (!userId) {
      throw new BadRequestError({ message: 'Must specify a user id', core: 'item' })
    }

    await this.itemPersistanceRepository.createItemWithUserId({ userId })
  }
}