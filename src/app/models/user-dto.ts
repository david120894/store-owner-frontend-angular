import {Person} from "../modules/auth/models/person.model";
import {PersonDto} from "./person-dto";

export interface UserDto {
  username:string
  password:string
  roles:string[]
  person: PersonDto
}
