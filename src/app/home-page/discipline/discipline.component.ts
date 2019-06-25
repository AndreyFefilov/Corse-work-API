import { Subscription } from 'rxjs';
import { UserService } from './../../_services/user.service';
import { AlertifyService } from './../../_services/alertify.service';
import { CourseService } from './../../_services/course.service';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog} from '@angular/material';
import { DeleteDisciplineComponent } from './delete-discipline/delete-discipline.component';
import { Course } from 'src/app/shared/models/course.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { Student } from 'src/app/shared/models/student.model';


@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DisciplineComponent implements OnInit, OnDestroy {

  form: FormGroup;

  showUpdate: boolean;
  courseName: string;
  description: string;
  formula: string;

  isMainTeacher = false;
  mainTeacherId: number;

  noStudents: boolean;

  groupMap: Map<string, Student[]> = new Map();
  studentsAndGroups: any;

  studentsSubs: Subscription;

  constructor(
              private formBuilder: FormBuilder,
              private courseService: CourseService,
              private authService: AuthService,
              private alertify: AlertifyService,
              private userService: UserService,
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

    this.studentsSubs = this.userService.$studentsLoaded.subscribe(students => {

      this.groupMap = new Map();

      for (const student of this.userService.courseStudents) {
        const groupStudents = this.groupMap.get(student.group);
        if (!groupStudents) {
          this.groupMap.set(student.group, [student]);
        } else {
          groupStudents.push(student);
        }
      }

      this.studentsAndGroups = Array.from(this.groupMap.entries()).sort();

    });
    this.loadStudents();
    this.loadTeachers();
  }

  ngOnDestroy() {
    if (this.studentsSubs) {
      this.studentsSubs.unsubscribe();
    }
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

  loadStudents() {
    this.userService.getCourseStudents(this.courseService.selectCourseId)
    .subscribe(students => {
      this.userService.courseStudents = students;
      console.log(this.userService.courseStudents);
      this.userService.$studentsLoaded.next(students);
  });
}

  loadTeachers() {
      this.userService.getCourseTeachers(this.courseService.selectCourseId)
      .subscribe(teachers => {
        this.userService.courseTeachers = teachers;
        console.log(this.userService.courseTeachers);
        this.checkMainTeacher();
    });
  }

  checkMainTeacher() {
    if (this.authService.decodedToken.role === 'Преподаватель') {
      const mainTeacher = this.userService.courseTeachers.find
      (x => x.main === 'Y');
      if (mainTeacher.id === this.userService.me.id) {
          this.isMainTeacher = true;
          this.mainTeacherId = mainTeacher.id;
        } else {
          this.isMainTeacher = false;
          return;
        }
    } else {
      return;
    }
  }

}
