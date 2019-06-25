import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../shared/models/user.model';
import { Observable, Subject } from 'rxjs';
import { Student } from '../shared/models/student.model';
import { Teacher } from '../shared/models/teacher.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl = 'http://localhost:5000/api/users/';

    me: User;
    id: number;
    mainTeacherId: number;
    isMainTeacher: boolean;

    photoUrl: string;

    courseStudents: Student[] = [];
    courseTeachers: Teacher[] = [];

    $studentsLoaded: Subject<Student[]> = new Subject();

    constructor(private http: HttpClient) {}

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`http://localhost:5000/api/users/get-user/${id}`)
            .pipe(map((data: User) => new User(data)));
    }

    getCourseTeachers(id: number): Observable<Teacher[]> {
        return this.http.get(`http://localhost:5000/api/users/get-teachers/${id}`)
        .pipe(
            map((teachers: ITeacher[]) => teachers
                .map(t => new Teacher(
                    t.id,
                    t.email,
                    t.firstName,
                    t.lastName,
                    t.patronymic,
                    t.photoUrl,
                    t.main))
            )
        );
    }

    getCourseStudents(id: number): Observable<Student[]> {
        return this.http.get(`http://localhost:5000/api/users/get-students/${id}`)
        .pipe(
            map((students: IStudent[]) => students
                .map(s => new Student(
                    s.id,
                    s.email,
                    s.firstName,
                    s.lastName,
                    s.patronymic,
                    s.photoUrl,
                    s.group,
                    s.subGroup))
            )
        );
    }

    updateUser(id: number, userModel: any): Observable<User> {
        return this.http.put(this.baseUrl + `update-user/${id}`, userModel)
            .pipe(
                map((u: IUser) => {
                    const updatedUser = new User(u);
                    return updatedUser;
                    }
                )
            );
        }

}

interface IStudent {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    photoUrl: string;
    group: string;
    subGroup: string;
}

interface ITeacher {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    photoUrl: string;
    main: string;
}

interface IUser {
    id: number;
    username: string;
    email: string;
    confirmEmail: string;
    firstName: string;
    lastName: string;
    patronymic: string;
    role: string;
    messageNotify: string;
    adNotify: string;
    artifactNotify: string;
    clusterId: number;
    resultNotify: string;
    photoUrl: string;
}
