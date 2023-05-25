import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'environments/environment'
import { CommonResponse } from 'app/core/models/core.models'
import { LoginRequest, MeResponse } from 'app/features/auth/auth.models'
import { Router } from '@angular/router'
import { ResultCodeEnum } from 'app/core/enums/resultCode.enum'
import { catchError, EMPTY } from 'rxjs'
import { NotificationService } from 'app/core/services/notification.service'

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  isAuth = false

  resolveAuthRequest: Function = () => {}
  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  login(data: Partial<LoginRequest>) {
    this.http
      .post<CommonResponse<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/login'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  me() {
    this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true
        } else {
          this.notificationService.handleError(res.messages[0])
        }
        this.resolveAuthRequest()
      })
  }

  handleError(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}
