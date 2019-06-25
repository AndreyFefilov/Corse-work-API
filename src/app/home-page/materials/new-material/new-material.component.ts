import { AlertifyService } from './../../../_services/alertify.service';
import { CourseService } from './../../../_services/course.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialService } from 'src/app/_services/material.service';
import { CourseDialogComponent } from '../../course-dialog/course-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NewMaterial } from 'src/app/shared/models/new.material';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.scss']
})
export class NewMaterialComponent implements OnInit {

  form: FormGroup;
  material = new NewMaterial();

  constructor(private formBuilder: FormBuilder,
              private materialService: MaterialService,
              private courseService: CourseService,
              private alertify: AlertifyService,
              public dialogRef: MatDialogRef<NewMaterialComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
      link: ''
  });
  }

  createMaterial() {
    this.material.name = this.form.controls.name.value,
    this.material.link = this.form.controls.link.value,
    this.material.courseId = this.courseService.selectCourseId;

    this.materialService.createMaterial(this.material).subscribe(() => {
      this.alertify.success('Материал добавлен');
      this.materialService.showNoMat = false;
    }, error => {
      this.alertify.error('Ошибка');
    });

    this.materialService.materials.sort((a, b) => {
      // tslint:disable-next-line:prefer-const
      let aname = a.name.toLowerCase();
      // tslint:disable-next-line:prefer-const
      let bname = b.name.toLowerCase();
      if (aname < bname) {
        return -1;
      }
      if (aname > bname) {
        return 1;
      }
    });
    console.log(this.materialService.materials);
    this.closeDialog();
  }


  closeDialog() {
    this.dialogRef.close();
  }

}
