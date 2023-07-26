import ItemModel from "../domain/item.model"
import ItemPersistanceRepository from "../domain/item.persistance.repository"

export default class ListItemsUseCase {
  constructor (private readonly itemPersistanceRepository: ItemPersistanceRepository) {}

  async list (): Promise<ItemModel[]> {
    const items = await this.itemPersistanceRepository.findItems()

    return items
  }
}