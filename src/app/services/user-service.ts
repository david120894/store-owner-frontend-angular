import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../modules/auth/models/api.response.model";
import {UserResponseDto} from "../models/user-response-dto";
import {environment} from "../../environments/environment";
import {UserDto} from "../models/user-dto";
import {PersonDto} from "../models/person-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  createUser(body: UserDto): Observable<ApiResponseModel<UserResponseDto>> {
    return this.http.post<ApiResponseModel<UserResponseDto>>(`${this.apiUrl}/register`, body)
  }

  getUser(): Observable<ApiResponseModel<Array<UserResponseDto>>> {
    return this.http.get<ApiResponseModel<Array<UserResponseDto>>>(`${this.apiUrl}/users`);
  }

  updateUser(idPerson:number,body:PersonDto):Observable<ApiResponseModel<UserResponseDto>>{
      return this.http.put<ApiResponseModel<UserResponseDto>>(`${this.apiUrl}/person/update/${idPerson}`,body)
  }
}
