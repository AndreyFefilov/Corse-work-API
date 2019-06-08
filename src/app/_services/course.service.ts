import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Course } from '../shared/models/course.model';

@Injectable({
    providedIn: 'root'
  })
  export class CourseService {
    baseUrl = 'http://localhost:5000/api/courses/';

    myCourses: Course[] = [];
    selectCourseId: number;
    currentCourse: Course;

    constructor(private http: HttpClient) { }

    createCourse(model: any): Observable<Course> {
        return this.http.post(this.baseUrl + 'create-course', model)
            .pipe(
                map((c: ICourse) => {
                    const newCourse = new Course(
                        c.id, c.name, c.description, c.formula
                    );
                    this.myCourses.push(newCourse);
                    return newCourse;
                    }
                )
            );
        }


    getTeacherCourses(teacherId: number): Observable<Course[]> {
      return this.http.get(`http://localhost:5000/api/courses/get-teacher-courses/${teacherId}`)
            .pipe(
                map((courses: ICourse[]) => courses
                    .map(c => new Course(
                        c.id, c.name, c.description, c.formula))
                )
            );
    }

    getStudentCourses(studentId: number): Observable<Course[]> {
      return this.http.get(`http://localhost:5000/api/courses/get-student-courses/${studentId}`)
            .pipe(
                map((courses: ICourse[]) => courses
                    .map(c => new Course(
                        c.id, c.name, c.description, c.formula))
                )
            );
        }

    getAdminCourses(): Observable<Course[]> {
        return this.http.get('http://localhost:5000/api/courses/get-all-courses/')
            .pipe(
                map((courses: ICourse[]) => courses
                    .map(c => new Course(
                        c.id, c.name, c.description, c.formula))
                )
            );
    }

    deleteCourse(id: number) {
        return this.http.delete(this.baseUrl + `delete-course/${id}`);
        }

    updateCourse(id: number, model: any): Observable<Course> {
        return this.http.put(this.baseUrl + `update-course/${id}`, model)
            .pipe(
                map((c: ICourse) => {
                    const newCourse = new Course(
                        c.id, c.name, c.description, c.formula
                    );
                    return newCourse;
                    }
                )
            );
        }

  }

interface ICourse {
    id: number;
    name: string;
    description: string;
    formula: string;
}
