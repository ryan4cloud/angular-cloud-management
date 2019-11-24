import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isCollapsed = false;
  constructor(
    private api: ApiService,
    private router: Router,
    private message: NzMessageService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
  }

  logout(): void {
    console.log('登出处理开始了！！！')
    const body: HttpParams = new HttpParams()
        .set('access_token', this.cookie.get('x-auth-token'));
    console.log(body);
    this.api.logout(body).subscribe(data => {
      if (data === 200) {
        console.log('登出成功！');
        // 除去本地存储的token
        this.cookie.deleteAll();
        this.message.success('登出成功！');
        this.router.navigate(['/login']);
      } else {
        console.log(data);
        this.message.error(data + ': 登出异常，请稍后重试！');
      }
    });
  }

}
