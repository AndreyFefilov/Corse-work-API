import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './../../_services/auth.service';
import { CourseService } from './../../_services/course.service';
import { MaterialService } from './../../_services/material.service';
import { Component, OnInit } from '@angular/core';
import { NewMaterialComponent } from './new-material/new-material.component';
import { UpdateMaterialComponent } from './update-material/update-material.component';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {

  static noMaterials: boolean;

  constructor(private materialService: MaterialService,
              private courseService: CourseService,
              private authService: AuthService,
              public dialog: MatDialog
              ) { }

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
  this.materialService.getCourseMaterials(this.courseService.selectCourseId)
  .subscribe(materials => {
    this.materialService.materials = materials;
    if (this.materialService.materials.length !== 0) {
      this.materialService.showNoMat = false;
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
    } else {
      this.materialService.showNoMat = true;
    }

  });
}

  goToSite(link: string) {
    window.open(link, '_blank');
  }

  openNewDialog() {
    const dialogRef = this.dialog.open(NewMaterialComponent, {
    });

    dialogRef.afterClosed().subscribe();
  }

  openUpdateDialog(event: MouseEvent, materialId: number, name: string, link: string ) {
    event.stopPropagation();
    this.materialService.selectedId = materialId;
    this.materialService.selectedName = name;
    this.materialService.selectedLink = link;
    const dialogRef = this.dialog.open(UpdateMaterialComponent, {
    });

    dialogRef.afterClosed().subscribe();
  }

  deleteMaterial(event: MouseEvent, materialId: number) {
    event.stopPropagation();
    this.materialService.deleteMaterial(materialId).subscribe();
    this.materialService.materials = this.materialService.materials
    .filter(m => m.id !== materialId);
  }

}
