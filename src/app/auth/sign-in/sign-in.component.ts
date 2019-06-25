import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';

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
    private titleService: Title,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Авторизация');

    this.form = this.formBuilder.group({
      formUsername: '',
      formPassword: '',
    });

    this.userService.photoUrl = null;
  }

  login() {
    this.authService.login(this.model).subscribe(token => {
      this.alertify.success('Вход успешно выполнен');

      this.userService.id = token;
      this.router.navigate(['']);
      this.userService.photoUrl = null;

    }, error => {
      this.alertify.error('Неправильный логин/почта или пароль');
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PasswordRecoveryComponent, {
    });
    dialogRef.afterClosed().subscribe();
  }

}
