import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SignInComponent } from '../sign-in.component';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {

  constructor(
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SignInComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  form: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      usernameOrEmail: '',
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  recoverPassword() {
  this.alertify.message(`На вашу почту отправлена инструкция по восстановлению пароля`);
  this.dialogRef.close();
 }
}
