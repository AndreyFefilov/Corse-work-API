import { AlertifyService } from './../../_services/alertify.service';
import { ClusterService } from './../../_services/cluster.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NewNameDialogComponent } from './new-name-dialog/new-name-dialog.component';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  image: SafeStyle;
  form: FormGroup;

  checkedGrade: boolean;
  checkedAd: boolean;
  checkedArtifact: boolean;
  checkedMessage: boolean;

  constructor(private userService: UserService,
              private clusterService: ClusterService,
              private formBuilder: FormBuilder,
              private sanitization: DomSanitizer,
              private alertify: AlertifyService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.image = this.sanitization.bypassSecurityTrustStyle('url(assets/images/profile-photo.jpg)');

    if (this.userService.me.photoUrl) {
      this.image = this.sanitization.bypassSecurityTrustStyle(`url(${this.userService.me.photoUrl})`);
    }


    this.form = this.formBuilder.group({
      group: this.clusterService.myGroup,
      subGroup: this.clusterService.mySubGroup,
    });

    if (this.userService.me.resultNotify === 'Y') {
      this.checkedGrade = true;
    } else {
      this.checkedGrade = false;
    }

    if (this.userService.me.adNotify === 'Y') {
      this.checkedAd = true;
    } else {
      this.checkedAd = false;
    }

    if (this.userService.me.artifactNotify === 'Y') {
      this.checkedArtifact = true;
    } else {
      this.checkedArtifact = false;
    }

    if (this.userService.me.messageNotify === 'Y') {
      this.checkedMessage = true;
    } else {
      this.checkedMessage = false;
    }
  }

  openNewNameDialog() {
    const dialogRef = this.dialog.open(NewNameDialogComponent, {
    });

    dialogRef.afterClosed().subscribe();
  }

  updateUserData(user: any) {
    this.userService.updateUser(this.userService.me.id, user).subscribe(() => {
      this.alertify.success('Ваши данные успешно изменены');
    }, error => {
      this.alertify.error('Ошибка изменения данных');
    });
  }
}
