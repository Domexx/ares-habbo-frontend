import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs/operators';
import { Setting } from 'src/app/_shared/model/setting';
import { AlertService } from 'src/app/_shared/service/alert.service';
import { SettingService } from 'src/app/_shared/service/setting.service';

@Component({
  selector: 'ares-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('250ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SettingsComponent implements OnInit {
  settings: Setting[];
  itemsToUpdate: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private settingService: SettingService,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  /**
   * Initialize component
   */
  ngOnInit(): void {
    this.settings = this.route.snapshot.data.settings.data;
  }

  /**
   * @param id
   * @param value
   */
  onChange(id: number, value: string): void {
    this.itemsToUpdate[id] = value;
  }

  /**
   * @param id
   * @param key
   */
  update(id: number, key: string): void {
    const setting = new Setting();
    setting.id = id;
    setting.key = key;
    setting.value = this.itemsToUpdate[id];

    this.itemsToUpdate = this.itemsToUpdate.filter(
      (value) => value !== setting.value
    );

    const subscription = this.settingService
      .set(setting.key, setting.value)
      .subscribe({
        next: () =>
          this.alertService.success(
            this.translateService.instant('HOBBA.SETTINGS.SUCCESS', {
              key: setting.key,
              value: setting.value,
            })
          ),
        complete: () => subscription.unsubscribe(),
      });
  }
}
