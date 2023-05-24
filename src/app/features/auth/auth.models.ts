export interface MeResponse {
  id: number
  email: string
  login: string
}
export interface LoginRequest {
  email: string | null | undefined
  password: string | null | undefined
  rememberMe: boolean | null | undefined
  captcha?: boolean
}
