import ItemModel from "./item.model"

export default interface ItemPersistanceRepository {
  createItemWithUserId ({ userId }: { userId: string }): Promise<void>
  findItems (): Promise<ItemModel[]>
}