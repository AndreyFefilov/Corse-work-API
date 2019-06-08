import { Component, OnInit, Inject } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateMaterialComponent } from '../../materials/update-material/update-material.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-discipline',
  templateUrl: './delete-discipline.component.html',
  styleUrls: ['./delete-discipline.component.scss']
})
export class DeleteDisciplineComponent implements OnInit {

  constructor(
              private courseService: CourseService,
              private alertify: AlertifyService,
              private router: Router,
              public dialogRef: MatDialogRef<UpdateMaterialComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  deleteDiscipline() {
    this.courseService.deleteCourse(this.courseService.selectCourseId).subscribe(() => {
        this.alertify.message('Дисциплина удалена');
      }, error => {
        this.alertify.error('Ошибка удаления');
      }
    );
    this.courseService.myCourses = this.courseService.myCourses
    .filter(m => m.id !== this.courseService.selectCourseId);
    this.closeDialog();
    this.router.navigate(['']);
  }

}
