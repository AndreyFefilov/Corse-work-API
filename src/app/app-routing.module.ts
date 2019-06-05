import { AuthGuard } from './_guards/auth.guard';
import { ArtifactsComponent } from './home-page/artifacts/artifacts.component';
import { AdsComponent } from './home-page/ads/ads.component';
import { ClassesComponent } from './home-page/classes/classes.component';
import { DisciplineComponent } from './home-page/discipline/discipline.component';
import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ExamsComponent } from './home-page/exams/exams.component';
import { ResultsComponent } from './home-page/results/results.component';
import { MessagesComponent } from './home-page/messages/messages.component';
import { MaterialsComponent } from './home-page/materials/materials.component';

export const routes: Routes = [
  { path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    component: HomePageComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'discipline',
        component: DisciplineComponent
      },
      {
        path: 'classes',
        component: ClassesComponent
      },
      {
        path: 'exams',
        component: ExamsComponent
      },
      {
        path: 'results',
        component: ResultsComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'ads',
        component: AdsComponent
      },
      {
        path: 'artifacts',
        component: ArtifactsComponent
      },
      {
        path: 'materials',
        component: MaterialsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },

];

