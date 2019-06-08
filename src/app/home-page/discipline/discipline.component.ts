import { AlertifyService } from './../../_services/alertify.service';
import { CourseService } from './../../_services/course.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DeleteDisciplineComponent } from './delete-discipline/delete-discipline.component';
import { Course } from 'src/app/shared/models/course.model';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DisciplineComponent implements OnInit {

  form: FormGroup;

  showUpdate: boolean;
  courseName: string;
  description: string;
  formula: string;

  constructor(
              private formBuilder: FormBuilder,
              private courseService: CourseService,
              private authService: AuthService,
              private alertify: AlertifyService,
              public dialog: MatDialog
             ) { }

  ngOnInit() {
    console.log(this.courseService.currentCourse);
    this.courseName = this.courseService.currentCourse.name;
    this.description = this.courseService.currentCourse.description;
    this.formula = this.courseService.currentCourse.formula;

    this.showUpdate = false;

    this.form = this.formBuilder.group({
      formName: this.courseService.currentCourse.name,
      formDescription: this.courseService.currentCourse.description,
      formFormula: this.courseService.currentCourse.formula,
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDisciplineComponent, {
    });

    dialogRef.afterClosed().subscribe();
  }

  toggleShow() {
    this.showUpdate = !this.showUpdate;
    this.form = this.formBuilder.group({
      formName: this.courseService.currentCourse.name,
      formDescription: this.courseService.currentCourse.description,
      formFormula: this.courseService.currentCourse.formula,
    });
  }

  updateCourse() {
    const course = new Course(
      this.courseService.currentCourse.id,
      this.form.controls.formName.value,
      this.form.controls.formDescription.value,
      this.form.controls.formFormula.value);

    this.courseService.updateCourse(this.courseService.selectCourseId, course).subscribe(() => {
      this.alertify.success('Данные дисциплины изменены');
    }, error => {
      this.alertify.error('Ошибка');
    });

    this.courseService.currentCourse.name = course.name;
    this.courseService.currentCourse.description = course.description;
    this.courseService.currentCourse.formula = course.formula;

    this.courseService.myCourses.sort((a, b) => {
      // tslint:disable-next-line:prefer-const
      let aname = a.name.toLowerCase();
      // tslint:disable-next-line:prefer-const
      let bname = b.name.toLowerCase();
      if (aname < bname) {
        return -1;
      }
      if (aname > bname) {
        return 1;
      }
    });

    this.showUpdate = !this.showUpdate;
  }

  toggleShowTab() {
    this.showUpdate = false;
  }

}
