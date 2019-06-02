import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { CourseService } from './../_services/course.service';
import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  firstName: string;
  lastName: string;
  patronymic: string;

  show = true;

  menuItems = [
    {
      value: 'discipline',
      text: 'Дисциплина'
    },
    {
      value: 'classes',
      text: 'Занятия'
    },
    {
      value: 'exams',
      text: 'Контрольные мероприятия'
    },
    {
      value: 'results',
      text: 'Результаты'
    },
    {
      value: 'messages',
      text: 'Сообщения'
    },
    {
      value: 'ads',
      text: 'Объявления'
    },
    {
      value: 'artifacts',
      text: 'Артефакты'
    },
    {
      value: 'materials',
      text: 'Учебные материалы'
    }
  ];

  selectedItem: string;
  id: number = this.authService.decodedToken.nameid;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
    public dialog: MatDialog,
    private courseService: CourseService,
  ) { }

  ngOnInit() {

    this.firstName = this.authService.decodedToken.family_name;
    this.lastName = this.authService.decodedToken.unique_name.substr(0, 1);
    this.patronymic = this.authService.decodedToken.given_name.substr(0, 1);

    this.userService.getUser(this.id).subscribe(user => {
      this.userService.me = user;
    });

    switch (this.authService.decodedToken.role) {
      case 'Преподаватель': {
        this.courseService.getTeacherCourses(this.id)
        .subscribe(courses => {
          this.courseService.myCourses = courses;
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
        });
        break;
      }

      case 'Студент': {
        this.courseService.getStudentCourses(this.id)
        .subscribe(courses => {
          this.courseService.myCourses = courses;
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
        });
        break;
      }

      case 'Админ': {
        break;
      }
    }

  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.router.navigate(['/auth']);
    localStorage.removeItem('token');
    console.log('logged out');
  }

  navigate(childRoute) {
    this.router.navigate([`/${childRoute}`], { relativeTo: this.route });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog "Create course" was closed');
    });
  }

  toggleSelect() {
    this.show = false;
    console.log(this.show);
  }

}

