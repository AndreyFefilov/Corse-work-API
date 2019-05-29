import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatToolbarModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { SignUpComponent } from './sign-in/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgxPasswordToggleModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
})
export class AuthModule { }
