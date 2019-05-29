import { ClassesComponent } from './home-page/classes/classes.component';
import { DisciplineComponent } from './home-page/discipline/discipline.component';
import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'discipline',
        component: DisciplineComponent
      },
      {
        path: 'classes',
        component: ClassesComponent
      }
    ]
  },
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
];

