import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
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
  MatSelectModule,
  MatTabsModule,
  MatTooltipModule
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
import { ExamsComponent } from './home-page/exams/exams.component';
import { ResultsComponent } from './home-page/results/results.component';
import { MessagesComponent } from './home-page/messages/messages.component';
import { ArtifactsComponent } from './home-page/artifacts/artifacts.component';
import { MaterialsComponent } from './home-page/materials/materials.component';
import { AdsComponent } from './home-page/ads/ads.component';
import { NewMaterialComponent } from './home-page/materials/new-material/new-material.component';
import { UpdateMaterialComponent } from './home-page/materials/update-material/update-material.component';
import { UserService } from './_services/user.service';
import { ProfileComponent } from './home-page/profile/profile.component';
import { AdminMenuComponent } from './home-page/admin-menu/admin-menu.component';
import { DeleteDisciplineComponent } from './home-page/discipline/delete-discipline/delete-discipline.component';

@NgModule({
   declarations: [
      AppComponent,
      HomePageComponent,
      DisciplineComponent,
      ClassesComponent,
      CourseDialogComponent,
      ExamsComponent,
      ResultsComponent,
      MessagesComponent,
      ArtifactsComponent,
      MaterialsComponent,
      AdsComponent,
      NewMaterialComponent,
      UpdateMaterialComponent,
      ProfileComponent,
      AdminMenuComponent,
      DeleteDisciplineComponent,
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
      MatTabsModule,
      ReactiveFormsModule,
      CommonModule,
      MatInputModule,
      MatAutocompleteModule,
      MatSelectModule,
      MatTooltipModule,

      RouterModule.forRoot(routes)
   ],

   providers: [
      UserService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      AuthService,
   ],

   entryComponents: [
      CourseDialogComponent,
      NewMaterialComponent,
      UpdateMaterialComponent,
      DeleteDisciplineComponent
   ],

   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
