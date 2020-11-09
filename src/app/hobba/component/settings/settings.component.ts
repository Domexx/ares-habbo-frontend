import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Setting } from 'src/app/_shared/model/setting';
import { SettingService } from 'src/app/_shared/service/setting.service';

@Component({
  selector: 'ares-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings: Setting[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.settings = this.route.snapshot.data.settings.data;
  }
}
