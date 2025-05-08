import {PersonDto} from "./person-dto";

export interface UserResponseDto {
  id: number
  username: string
  roles: string[]
  person:PersonDto
}
