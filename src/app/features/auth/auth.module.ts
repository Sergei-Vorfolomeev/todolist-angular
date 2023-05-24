import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthComponent } from 'app/features/auth/components/auth.component'
import { AuthRoutingModule } from 'app/features/auth/auth-routing.module'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
