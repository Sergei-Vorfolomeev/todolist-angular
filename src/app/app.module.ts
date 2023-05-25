import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AuthModule } from 'app/features/auth/auth.module'
import { TodosModule } from 'app/features/todos/todos.module'
import { CoreModule } from 'app/core/core.module'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from 'app/shared/shared.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    TodosModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
