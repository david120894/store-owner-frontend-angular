import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../modules/auth/models/api.response.model";
import {StoreDto} from "../models/store.dto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:'root'
})
export class StoreService{
  url = environment.apiUrl
  constructor(private httpClient: HttpClient) {
  }
  getStore():Observable<ApiResponseModel<Array<StoreDto>>>{
    return this.httpClient.get<ApiResponseModel<Array<StoreDto>>>(`${this.url}/store`)
  }

  getStoreById(idStore: number): Observable<ApiResponseModel<StoreDto>> {
    return this.httpClient.get<ApiResponseModel<StoreDto>>(`${this.url}/store/${idStore}`)
  }

  createStore(store: StoreDto): Observable<ApiResponseModel<StoreDto>> {
    return this.httpClient.post<ApiResponseModel<StoreDto>>(`${this.url}/store`,store)
  }

  updateStore(idStore: number,store: StoreDto): Observable<ApiResponseModel<StoreDto>> {
    return this.httpClient.put<ApiResponseModel<StoreDto>>(`${this.url}/store/${idStore}`,store)
  }

  deleteStore(idStore: number): Observable<ApiResponseModel<StoreDto>> {
    return this.httpClient.delete<ApiResponseModel<StoreDto>>(`${this.url}/store/${idStore}`)
  }

}
