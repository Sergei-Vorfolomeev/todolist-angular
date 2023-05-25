import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { TodosInterceptor } from 'app/core/interceptors/todos.interceptor'
import { AuthService } from 'app/core/services/auth.service'
import { NotificationService } from 'app/core/services/notification.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TodosInterceptor, multi: true },
    AuthService,
    NotificationService,
  ],
})
export class CoreModule {}
