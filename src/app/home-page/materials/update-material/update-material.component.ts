import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Material } from 'src/app/shared/models/material.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialService } from 'src/app/_services/material.service';
import { CourseService } from 'src/app/_services/course.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.scss']
})
export class UpdateMaterialComponent implements OnInit {

  form: FormGroup;

  constructor(
              private formBuilder: FormBuilder,
              private materialService: MaterialService,
              private courseService: CourseService,
              private alertify: AlertifyService,
              public dialogRef: MatDialogRef<UpdateMaterialComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.materialService.selectedName,
      link: this.materialService.selectedLink,
    });
  }

  updateMaterial() {
    const material = new Material(
      this.materialService.selectedId,
      this.form.controls.name.value,
      this.form.controls.link.value,
      this.courseService.selectCourseId);

    this.materialService.updateMaterial(this.materialService.selectedId, material).subscribe(() => {
      this.alertify.success('Материал изменён');
    }, error => {
      this.alertify.error('Ошибка');
    });

    this.materialService.selectedName = material.name;
    this.materialService.selectedLink = material.link;

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

    const mat = this.materialService.materials.find(m =>
      m.id === this.materialService.selectedId);
    if (mat == null) {
      return;
    } else {
      mat.name = material.name;
      mat.link = material.link;
    }

    console.log(this.materialService.materials);
    this.closeDialog();
  }


  closeDialog() {
    this.dialogRef.close();
  }

}
