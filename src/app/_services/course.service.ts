import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// import { Course } from '../shared/models/course.model';

@Injectable({
    providedIn: 'root'
  })
  export class CourseService {
    baseUrl = 'http://localhost:5000/api/courses/';

    decodedToken: any;

    constructor(private http: HttpClient) { }

    createCourse(model: any) {
        return this.http.post(this.baseUrl + 'create-course', model);
    }
  }
