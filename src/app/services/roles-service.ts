import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../modules/auth/models/api.response.model";
import {RolesDto} from "../models/roles-dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class RolesService {
  url = environment.apiUrl
  constructor(private http: HttpClient) {
  }

  getRoles():Observable<ApiResponseModel<RolesDto[]>>{
    return this.http.get<ApiResponseModel<RolesDto[]>>(`${this.url}/roles`);
  }
}
