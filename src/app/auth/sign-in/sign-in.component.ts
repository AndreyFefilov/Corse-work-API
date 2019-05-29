import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../_services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;
  model: any = {};

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      formUsername: '',
      formPassword: '',
    });
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('login is success');
    }, error => {
      console.log('login is FAIL!');
    });
  }

}
