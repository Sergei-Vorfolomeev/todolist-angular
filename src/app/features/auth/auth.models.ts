export interface AuthResponse {
  id: number
  email: string
  login: string
}
export interface AuthRequest {
  email?: string | null | undefined
  password?: string | null | undefined
  rememberMe?: boolean | null | undefined
  captcha?: boolean
}
