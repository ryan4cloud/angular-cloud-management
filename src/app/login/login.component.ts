import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { NzMessageService } from "ng-zorro-antd/message";
import { isNullOrUndefined } from 'util';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  errorMessage: string = '';
  msgType: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService,
    private message: NzMessageService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  onSubmit(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    if (this.validateForm.invalid) {
      console.log("请输入正确的用户名和密码。")
      return;
    }
    const body: HttpParams = new HttpParams()
        .set('username', this.validateForm.controls.username.value)
        .set('password', this.validateForm.controls.password.value)
        .set('grant_type', 'password');
    
    this.api.login(body).subscribe(
      data => {
        console.log(data);
        console.log(data['error']);
        if (data['error'] != null && data['error'] != '') {
          this.message.create('error', data['error_description']);
        }
        this.cookie.set('x-auth-token', data['access_token'], data['expires_in']);
        this.cookie.set('x-refresh-token', data['refresh_token'], data['expires_in']);
        this.cookie.set('x-token-type', data['token_type'], data['expires_in']);
        const redirect = localStorage.getItem('redirectUrl')
        if (!isNullOrUndefined(redirect)) {
          this.router.navigate([redirect]);
        } else {
          this.router.navigate(['/']);
        }
      }
    );
    
  }

}
