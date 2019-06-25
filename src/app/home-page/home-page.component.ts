import { ClusterService } from './../_services/cluster.service';
import { AlertifyService } from './../_services/alertify.service';
import { MaterialService } from './../_services/material.service';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { CourseService } from './../_services/course.service';
import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { Title } from '@angular/platform-browser';
import { Cluster } from '../shared/models/cluster.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  myCluster: Cluster;

  firstName: string;
  lastName: string;
  patronymic: string;

  show = true;
  showBlurBlock: boolean;

  isMainTeacher = false;
  mainTeacherId: number;

  myPhotoUrl = 'assets/images/profile-photo.jpg';

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
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
    public dialog: MatDialog,
    private clusterService: ClusterService,
    private courseService: CourseService,
    private materilService: MaterialService,
    private alertify: AlertifyService,
    private titleService: Title
  ) { }

  ngOnInit() {

    this.titleService.setTitle('Дисциплины ИПМКН');

    this.id = this.authService.decodedToken.nameid;

    this.courseService.myCourses = [];

    this.showBlurBlock = true;

    this.firstName = this.authService.decodedToken.family_name;
    this.lastName = this.authService.decodedToken.unique_name.substr(0, 1);
    this.patronymic = this.authService.decodedToken.given_name.substr(0, 1);

    this.userService.getUser(this.id).subscribe(user => {
      this.userService.me = user;
      console.log(this.userService.me);
      if (this.userService.me.photoUrl !== null || this.userService.me.photoUrl !== '') {
        this.myPhotoUrl = this.userService.me.photoUrl;
        this.userService.photoUrl = this.userService.me.photoUrl;
      } else {
        this.myPhotoUrl = 'assets/images/profile-photo.jpg';
        this.userService.photoUrl = 'assets/images/profile-photo.jpg';
      }
      this.loadClusters();
    });

    this.loadCourses();

    if (this.authService.decodedToken.role === 'Админ') {
      this.menuItems = this.menuItems.filter(m => m.value !== 'artifacts');
    }

  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
    this.alertify.message('Выполнен выход из системы');
    this.courseService.myCourses = [];
    this.materilService.materials = [];
  }

  navigate(childRoute) {
    this.router.navigate([`/${childRoute}`], { relativeTo: this.route });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CourseDialogComponent, {
    });

    dialogRef.afterClosed().subscribe();
  }

  toggleSelect() {
    this.show = false;
    this.showBlurBlock = false;
    this.router.navigate(['/discipline']);
    this.selectedItem = 'discipline';
    this.materilService.materials = [];
  }

  loadCourses() {
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

          if (this.courseService.myCourses.length !== 0) {
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
          } else {
            this.alertify.warning('Вас ещё не записали ни на одну дисциплину');
          }

        });
        break;
      }

      case 'Админ': {
        this.courseService.getAdminCourses()
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
    }
  }

  loadClusters() {
    this.clusterService.getAllClusters()
    .subscribe(clusters => {
      this.clusterService.allClusters = clusters;
      console.log(this.clusterService.allClusters);
      if (this.userService.me.role === 'Студент') {
        this.myCluster = this.clusterService.allClusters
          .find(cluster => cluster.id === this.userService.me.clusterId);
        console.log(this.myCluster);

        if (this.myCluster != null) {
          this.clusterService.myGroup = this.myCluster.group;
          this.clusterService.mySubGroup = this.myCluster.subGroup;
        } else {
          return;
        }
      }


  });
}

  changeCourse(event) {
    this.courseService.selectCourseId = event;
    this.courseService.currentCourse = this.courseService.myCourses.find
      (x => x.id === event);
    this.userService.isMainTeacher = false;
    this.loadStudents();
    this.loadTeachers();
}

  moveToProfile() {
    this.router.navigate(['/profile']);
    this.selectedItem = null;
    this.show = false;
  }

  moveToAdmin() {
    this.router.navigate(['/admin']);
    this.selectedItem = null;
    this.show = false;
  }

  loadTeachers() {
    this.userService.getCourseTeachers(this.courseService.selectCourseId)
    .subscribe(teachers => {
      this.userService.courseTeachers = teachers;
      console.log(this.userService.courseTeachers);
      this.checkMainTeacher();
      const mainTeacher = this.userService.courseTeachers.find(x => x.main === 'Y');
      this.userService.mainTeacherId = mainTeacher.id;
  });

}

loadStudents() {
    this.userService.getCourseStudents(this.courseService.selectCourseId)
    .subscribe(students => {
      this.userService.courseStudents = students;
      console.log(this.userService.courseStudents);
      this.userService.$studentsLoaded.next(students);
  });
}


checkMainTeacher() {
  if (this.authService.decodedToken.role === 'Преподаватель') {
    const mainTeacher = this.userService.courseTeachers.find
    (x => x.main === 'Y');
    if (mainTeacher.id === this.userService.me.id) {
      this.userService.isMainTeacher = true;
      } else {
        this.userService.isMainTeacher = false;
        return;
      }
  } else {
    return;
  }
}

}

