import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../_services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  model: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      formUsername: '',
      formPassword: '',
    });
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      const user = {}; // Create user

      this.userService.me = user;
      console.log('login is success');
    }, error => {
      console.log('login is FAIL!');
    });
  }

}
