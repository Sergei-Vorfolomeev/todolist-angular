import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'
import { CommonResponse } from 'app/core/models/core.models'
import { AuthRequest, AuthResponse } from 'app/features/auth/auth.models'
import { Router } from '@angular/router'
import { ResultCodeEnum } from 'app/core/enums/resultCode.enum'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(data: Partial<AuthRequest>) {
    this.http
      .post<CommonResponse<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/'])
        }
      })
  }

  logout() {
    this.http.delete<CommonResponse>(`${environment.baseUrl}/auth/login`).subscribe(res => {
      if (res.resultCode === ResultCodeEnum.success) {
        this.router.navigate(['/login'])
      }
    })
  }

  me() {
    this.http
      .get<CommonResponse<AuthResponse>>(`${environment.baseUrl}/auth/me`)
      .subscribe(() => {})
  }
}
