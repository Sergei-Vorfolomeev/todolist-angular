import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { TodosInterceptor } from 'app/core/interceptors/todos.interceptor'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TodosInterceptor, multi: true }],
})
export class CoreModule {}
