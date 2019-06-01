import { AlertifyService } from './../../../_services/alertify.service';
import { AuthService } from './../../../_services/auth.service';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, map, startWith, tap } from 'rxjs/operators';
import { ClusterService } from '../../../_services/cluster.service';
import { Cluster } from 'src/app/shared/models/cluster.model';
import { RegStudent } from 'src/app/shared/models/reg.student.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private clusterSrv: ClusterService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  form: FormGroup;

  $clusters: Observable<Cluster[]>;
  $flows: Observable<string[]>;
  $flowsOptions: Observable<string[]>;
  $groups: Observable<string[]>;
  $groupsOptions: Observable<string[]>;
  $subGroups: Observable<string[]>;
  $subGroupsOptions: Observable<string[]>;

  private groupsMap: Map<string, string> = new Map();
  private subGroupMap: Map<string, string> = new Map();
  private clusterIdMap: Map<string, number> = new Map();
  private clusterKey: string;

  subs: Subscription;
  student = new RegStudent();

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      patronymic: '',
      password: '',
      studyFlow: '',
      group: '',
      subGroup: '',
    });

    this.form.controls.group.disable();
    this.form.controls.subGroup.disable();

    this.$clusters = this.clusterSrv.getAllClusters()
      .pipe(
        tap(clusters => {
          clusters.forEach(cluster => {
            this.groupsMap.set(cluster.group, cluster.flow);
            this.subGroupMap.set(`${cluster.group}-${cluster.subGroup}`, cluster.group);
            this.clusterIdMap.set(cluster.flow + cluster.group + cluster.subGroup, cluster.id);
          });
        })
      );

    this.$groups = this.$clusters.pipe(
      map(clusters => clusters
        .map(cluster => cluster.group)
        .filter((group, index, arr) => this.form.controls.studyFlow.value
          ? arr.indexOf(group) === index && this.groupsMap.get(group) === this.form.controls.studyFlow.value
          : arr.indexOf(group) === index
        )
      )
    );

    this.$subGroups = this.$clusters.pipe(
      map(clusters => clusters
        .map(cluster => cluster.subGroup)
        .filter((subGroup, index, arr) => this.form.controls.group.value
          ? arr.indexOf(subGroup) === index
             && this.subGroupMap.get(`${this.form.controls.group.value}-${subGroup}`) === this.form.controls.group.value
          : arr.indexOf(subGroup) === index
        )
      )
    );

    this.$flows = this.$clusters.pipe(
      map(clusters => clusters
        .map(cluster => cluster.flow)
        .filter((flow, index, arr) => arr.indexOf(flow) === index)
      )
    );

    this.$flowsOptions = this.form.controls.studyFlow.valueChanges
      .pipe(
        startWith(''),
        tap(value => {
          if (!value) {
            this.form.controls.group.disable();
            this.form.controls.group.reset();
          }
        }),
        mergeMap(value => value ? this._filter(value, this.$flows) : this.$flows),
        map(values => values.sort()),
      );

    this.$groupsOptions = this.form.controls.group.valueChanges
      .pipe(
        startWith(''),
        tap(value => {
          if (!value) {
            this.form.controls.subGroup.disable();
            this.form.controls.subGroup.reset();
          }
        }),
        mergeMap(value => value ? this._filter(value, this.$groups) : this.$groups),
        map(values => values.sort()),
      );

    this.$subGroupsOptions = this.form.controls.subGroup.valueChanges
      .pipe(
        startWith(''),
        mergeMap(value => value ? this._filter(value, this.$subGroups) : this.$subGroups),
        map(values => values.sort()),
      );
  }

  onStudyFlowSelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value) {
      this.form.controls.group.enable();
      this.form.controls.group.reset();
    }
  }

  onGroupSelected(event: MatAutocompleteSelectedEvent) {
    if (event.option.value) {
      this.form.controls.subGroup.enable();
      this.form.controls.subGroup.reset();
    }
  }

  private _filter(
    value: string,
    arr: Observable<string[]>,
    controlValue?: string,
    valuesMap?: Map<string, string>
  ): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return arr.pipe(
      map(strings => controlValue && valuesMap
         ? strings.filter(str => str.toLowerCase().indexOf(filterValue) === 0 && valuesMap.get(str) === controlValue)
         : strings.filter(str => str.toLowerCase().indexOf(filterValue) === 0)
      )
    );
  }

  register() {
    this.clusterKey = this.form.controls.studyFlow.value + this.form.controls.group.value + this.form.controls.subGroup.value;

    this.student.username = this.form.controls.username.value,
    this.student.email = this.form.controls.email.value,
    this.student.firstName = this.form.controls.firstName.value,
    this.student.lastName = this.form.controls.lastName.value,
    this.student.patronymic = this.form.controls.patronymic.value,
    this.student.password = this.form.controls.password.value,
    this.student.clusterId = this.clusterIdMap.get(this.clusterKey),

    console.log(this.student);

    this.authService.register(this.student).subscribe(() => {
      this.alertify.success('Регистрация прошла успешно');
    }, error => {
      this.alertify.error('Ошибка регистрации');
    });
  }

}
