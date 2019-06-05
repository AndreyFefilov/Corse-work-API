import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

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
    private userService: UserService,
    private alertify: AlertifyService,
    private http: HttpClient,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Авторизация');

    this.form = this.formBuilder.group({
      formUsername: '',
      formPassword: '',
    });
  }

  login() {
    this.authService.login(this.model).subscribe(token => {
      this.alertify.success('Вход успешно выполнен');

      this.userService.getUser(token).subscribe(user => {
        this.userService.me = user;
        this.router.navigate(['']);
        console.log(this.userService.me);
      });
    }, error => {
      this.alertify.error('Неправильный логин/почта или пароль');
    });
  }

}
