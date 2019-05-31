import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  courses: string[] = [
    'Базы данных',
    'ООАП',
    'Сис. прог. 2',
    'Имит. моделирование'
  ];

  firstName: string;
  lastName: string;
  patronymic: string;

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.firstName = this.authService.decodedToken.family_name;
    this.lastName = this.authService.decodedToken.unique_name.substr(0, 1);
    this.patronymic = this.authService.decodedToken.given_name.substr(0, 1);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
    this.router.navigate(['/auth']);
  }

    // this.userService.me;

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

}

