import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Notification } from 'app/core/models/notification.models'

@Injectable()
export class NotificationService {
  notification$ = new BehaviorSubject<Notification | null>(null)

  handleSuccess(message: string) {
    this.notification$.next({ severity: 'success', message })
  }
  handleError(message: string) {
    this.notification$.next({ severity: 'error', message })
  }
  clear() {
    this.notification$.next(null)
  }
}
