import { UserService } from './../../_services/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _photoUrl: string;

  @Input() set photoUrl(value) {
    this._photoUrl = value ? value : 'assets/images/profile-photo.jpg';
  }

  get photoUrl() {
    return this._photoUrl;
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.photoUrl = 'assets/images/profile-photo.jpg';
  }

}
