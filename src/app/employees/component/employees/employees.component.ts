import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PermissionRank} from '../../model/permission-rank.model';

@Component({
  selector: 'ares-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  ranks: PermissionRank[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ranks = this.route.snapshot.data.ranks;
  }

}
