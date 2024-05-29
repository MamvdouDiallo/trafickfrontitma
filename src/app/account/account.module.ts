import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthModule } from './auth/auth.module';
import { UIModule } from '../shared/ui/ui.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
    AuthModule,
    UIModule
  ]
})
export class AccountModule { }
