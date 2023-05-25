import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Notification } from 'app/core/models/notification.models'
import { NotificationService } from 'app/core/services/notification.service'

@Component({
  selector: 'tl-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(private notificationService: NotificationService) {}

  notification$!: BehaviorSubject<Notification | null>

  ngOnInit(): void {
    this.notification$ = this.notificationService.notification$
  }

  closeNotification() {
    this.notificationService.clear()
  }
}
