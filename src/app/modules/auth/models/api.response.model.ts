export class ApiResponseModel<T> {
  message: string
  statusCode:number
  data:T
  success:boolean
  timestamp: string
}
