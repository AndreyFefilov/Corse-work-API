import { UserService } from './../../_services/user.service';
import { CourseService } from './../../_services/course.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Course } from 'src/app/shared/models/course.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})

export class CourseDialogComponent implements OnInit {

  form: FormGroup;
  course = new Course();

  constructor(private formBuilder: FormBuilder,
              private alertify: AlertifyService,
              private courseService: CourseService,
              private userService: UserService,
              public dialogRef: MatDialogRef<CourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      description: '',
  });
}

  createCourse() {
    this.course.name = this.form.controls.name.value,
    this.course.description = this.form.controls.description.value,
    this.course.teacherId = this.userService.me.id;

    console.log(this.course);

    this.courseService.createCourse(this.course).subscribe(() => {
      this.alertify.success(`Дисциплина "${this.form.controls.name.value}" успешно создана`);
    }, error => {
      this.alertify.error('Ошибка в создании дисциплины');
    });
    this.dialogRef.close();
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
