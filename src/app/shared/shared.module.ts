import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NotificationComponent } from 'app/shared/components/notification/notification.component'

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule],
  exports: [NotificationComponent],
})
export class SharedModule {}
