import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CategoryDto} from "../models/category.dto";
import {environment} from "../../environments/environment";
import {ApiResponseModel} from "../modules/auth/models/api.response.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService{
  url = environment.apiUrl
  constructor(private httpClient: HttpClient) {
  }
  getCategory(): Observable<ApiResponseModel<Array<CategoryDto>>> {
    return this.httpClient.get<ApiResponseModel<Array<CategoryDto>>>(`${this.url}/category`)
  }
  getCategoryByStoreId(idStore: number): Observable<ApiResponseModel<CategoryDto[]>> {
    return this.httpClient.get<ApiResponseModel<CategoryDto[]>>(`${this.url}/category/${idStore}`)
  }
  createCategory(body: CategoryDto):Observable<ApiResponseModel<CategoryDto>>{
    return this.httpClient.post<ApiResponseModel<CategoryDto>>(`${this.url}/category`,body)
  }
  updateCategory(idCategory:number, body:CategoryDto):Observable<ApiResponseModel<CategoryDto>> {
    return this.httpClient.put<ApiResponseModel<CategoryDto>>(`${this.url}/category/${idCategory}`,body)
  }
}
