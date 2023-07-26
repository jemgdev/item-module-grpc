import PrismaConnection from "../../prisma/prisma.connection"
import UnavailableError from "../../utils/custom-errors/infrastructure-errors/unavailable.error"
import ItemModel from "../domain/item.model"
import ItemPersistanceRepository from "../domain/item.persistance.repository"

const prisma = new PrismaConnection().connection

export default class ItemPrismaRepository implements ItemPersistanceRepository {
  async createItemWithUserId({ userId }: { userId: string; }): Promise<void> {
    try {
      await prisma.item.create({
        data: {
          user_id: userId,
          item_name: 'Default item name',
          item_description: 'Default item description'
        }
      })
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'item' })
    }
    
  }

  async findItems(): Promise<ItemModel[]> {
    try {
      const items = await prisma.item.findMany()

      return items.map(item => {
        return {
          itemId: item.item_id,
          userId: item.user_id,
          description: item.item_description,
          createdAt: item.create_at
        }
      })
    } catch (error: any) {
      throw new UnavailableError({ message: error.message, core: 'item' })
    }
  }
}