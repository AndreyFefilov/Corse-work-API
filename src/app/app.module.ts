import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatToolbarModule
} from '@angular/material';

import { RouterModule } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { HomePageComponent } from './home-page/home-page.component';
import { routes } from './app-routing.module';
import { ClusterService } from './_services/cluster.service';
import { DisciplineComponent } from './home-page/discipline/discipline.component';
import { ClassesComponent } from './home-page/classes/classes.component';

@NgModule({
   declarations: [
      AppComponent,
      HomePageComponent,
      DisciplineComponent,
      ClassesComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      MatButtonModule,

      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatDividerModule,
      MatProgressBarModule,
      MatCardModule,

      RouterModule.forRoot(routes)
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
