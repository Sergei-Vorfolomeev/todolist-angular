import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Validators } from '@angular/forms'
import { AuthService } from 'app/core/services/auth.service'

@Component({
  selector: 'tl-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(
          '^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$'
        ),
      ],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    rememberMe: new FormControl(false, { nonNullable: true }),
  })

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  onLoginSubmit() {
    const value = this.loginForm.value
    this.authService.login(value)
  }
}
