import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {}

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
    this.router.navigate(['/auth']);
  }

  navigate(childRoute) {
    this.router.navigate([`/${childRoute}`], { relativeTo: this.route });
  }

}
