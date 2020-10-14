import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../_shared/model/user/user';
import {environment} from '../../../../../environments/environment';
import {LanguageService} from '../../../../_shared/service/language.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ares-layout-employees-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  employee$: User;
  color$: string;
  badge$: string;
  name$: string;
  locale: string;

  localeSubscription: Subscription;

  /**
   * Sets the employee
   * @param value User Object
   */
  @Input('employee')
  set employee(value: User) {
    this.employee$ = value;
  }

  @Input('name')
  set name(value: string) {
    this.name$ = value;
  }

  /**
   * Sets the rank color
   * @param value Color
   */
  @Input('color')
  set color(value: string) {
    this.color$ = value;
  }

  /**
   * Sets the badge
   * @param value Badge
   */
  @Input('badge')
  set badge(value: string) {
    this.badge$ = value;
  }

  constructor(private languageService: LanguageService) {
  }

  /**
   * Initialize Item component
   */
  ngOnInit(): void {
    this.localeSubscription = this.languageService.currentLang.subscribe({
      next: value => this.locale = value
    });
  }

  /**
   * Returns the final look string
   * @param look Figure String
   * @return string
   */
  public figure(look: string): string {
    return `${environment.app.imager}${look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;
  }

  /**
   * Returns a formatted string including pre-configured badge path
   * with the given badge code
   *
   * @param code Badge Code
   * @return string
   */
  public badgePath(code: string): string {
    return `${environment.app.album1584}${code}.gif`;
  }

  /**
   * Gets called after the component gets destroyed
   */
  ngOnDestroy(): void {
    if (this.localeSubscription && !this.localeSubscription.unsubscribe) {
      this.localeSubscription.unsubscribe();
    }
  }

}
