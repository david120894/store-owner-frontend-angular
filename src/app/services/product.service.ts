import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ApiResponseModel} from "../modules/auth/models/api.response.model";
import {ProductDto} from "../models/product.dto";

@Injectable({
  providedIn: 'root'
})

export class ProductService{
  url = `${environment.apiUrl}/product`
  constructor(private httpClient: HttpClient) {
  }
  getProduct(): Observable<ApiResponseModel<Array<ProductDto>>> {
    return this.httpClient.get<ApiResponseModel<Array<ProductDto>>>(this.url)
  }
  getProductByStoreId(idStore: number): Observable<ApiResponseModel<ProductDto[]>> {
    return this.httpClient.get<ApiResponseModel<ProductDto[]>>(`${this.url}/${idStore}`)
  }
  createProduct(body: ProductDto):Observable<ApiResponseModel<ProductDto>>{
    return this.httpClient.post<ApiResponseModel<ProductDto>>(this.url,body)
  }
  updateProduct(idProduct:number, body:ProductDto):Observable<ApiResponseModel<ProductDto>> {
    return this.httpClient.put<ApiResponseModel<ProductDto>>(`${this.url}/${idProduct}`,body)
  }
  uploadImage(idProduct:number, file:File):Observable<ApiResponseModel<ProductDto>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<ApiResponseModel<ProductDto>>(`${this.url}/upload/img/${idProduct}`, formData)
  }
}
