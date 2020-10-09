/*
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 *
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PermissionRank} from '../model/permission-rank.model';
import {TitleService} from '../../_shared/service/title.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ares-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  ranks: PermissionRank[];

  constructor(
    private route: ActivatedRoute,
    private title: TitleService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.ranks = this.route.snapshot.data.ranks;
    this.title.setTitle(this.translate.instant('EMPLOYEES.TITLE'));
  }

}
