import {StoreDto} from "./store.dto";

export interface CategoryDto{
  id?: number
  categoryName: string
  categoryDescription: string
  created?: string
  store: StoreDto
}
