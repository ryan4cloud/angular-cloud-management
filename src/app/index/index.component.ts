import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isCollapsed = false;
  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(): void {
    console.log('登出处理开始了！！！')
    const body: HttpParams = new HttpParams()
        .set('access_token', window.sessionStorage.getItem('x-auth-token'));
    console.log(body);
    this.api.logout(body).subscribe(data => {
      console.log('登出成功！');
    });

    // 除去本地存储的token
    window.sessionStorage.removeItem('x-auth-token');
    this.router.navigate(['/login']);
  }

}
