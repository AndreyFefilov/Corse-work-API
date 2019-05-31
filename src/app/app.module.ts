import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelect,
  MatSelectModule
} from '@angular/material';

import { RouterModule } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { HomePageComponent } from './home-page/home-page.component';
import { routes } from './app-routing.module';
import { ClusterService } from './_services/cluster.service';
import { DisciplineComponent } from './home-page/discipline/discipline.component';
import { ClassesComponent } from './home-page/classes/classes.component';
import { CourseDialogComponent } from './home-page/course-dialog/course-dialog.component';
import { CommonModule } from '@angular/common';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

@NgModule({
   declarations: [
      AppComponent,
      HomePageComponent,
      DisciplineComponent,
      ClassesComponent,
      CourseDialogComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      MatButtonModule,

      MatToolbarModule,
      MatIconModule,
      MatMenuModule,
      MatDividerModule,
      MatProgressBarModule,
      MatCardModule,
      MatDialogModule,
      MatFormFieldModule,
      ReactiveFormsModule,
      CommonModule,
      MatInputModule,
      MatAutocompleteModule,
      MatSelectModule,

      RouterModule.forRoot(routes)
   ],

   providers: [
      ErrorInterceptorProvider
   ],

   entryComponents: [
      CourseDialogComponent,
   ],

   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
