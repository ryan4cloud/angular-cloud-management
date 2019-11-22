import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from './index.component';
import { WelcomeComponent } from '../pages/welcome/welcome.component';
import { AuthGuardService } from '../auth-guard.service';

const routes: Routes = [{
  path: '',
  component: IndexComponent,
  canActivate: [ AuthGuardService ],
  children: [
    { path: '', component: WelcomeComponent, canActivate: [ AuthGuardService ] }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class IndexRoutingModule { }
