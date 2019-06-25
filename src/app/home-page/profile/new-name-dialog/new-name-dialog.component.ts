import { UserService } from 'src/app/_services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileComponent } from '../profile.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-name-dialog',
  templateUrl: './new-name-dialog.component.html',
  styleUrls: ['./new-name-dialog.component.scss']
})
export class NewNameDialogComponent implements OnInit {

  constructor(
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  form: FormGroup;

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: this.userService.me.firstName,
      lastName: this.userService.me.lastName,
      patronymic: this.userService.me.patronymic,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  changeFullName() {
    this.alertify.message('Запрос отправлен администратору');
    this.dialogRef.close();
 }
}
