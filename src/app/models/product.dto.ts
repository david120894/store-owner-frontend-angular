import {CategoryDto} from "./category.dto";

export interface ProductDto{
  id: number
  name: string
  code: string
  description: string
  created?: string
  imageUrl?: string
  categoryDto: CategoryDto
}
