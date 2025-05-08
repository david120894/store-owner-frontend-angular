import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';
import {Person} from "./person.model";

export class UserModel {
  id: number
  username: string
  roles: Array<string>
  person: Person
}
