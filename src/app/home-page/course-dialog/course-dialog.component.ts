import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})

export class CourseDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private alertify: AlertifyService,
              public dialogRef: MatDialogRef<CourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      description: '',
  });
}

  createCourse() {
    this.dialogRef.close();
    this.alertify.success(`Дисциплина "${this.form.controls.name.value}" успешно создана`);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
