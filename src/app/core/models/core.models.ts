export interface CommonResponse<T = object> {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: T
}
