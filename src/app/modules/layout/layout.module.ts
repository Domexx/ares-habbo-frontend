import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { NavigationComponent } from '../../layout/header/navigation/navigation.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FriendsComponent } from '../../layout/dashboard/friends/friends.component';
import {LanguageSelectorComponent} from '../../layout/language-selector/language-selector.component';
import { BsSelectComponent } from '../../layout/bs-select/bs-select.component';
import {FormsModule} from '@angular/forms';
import {BsSelectDirective} from '../../layout/bs-select/bs-select.directive';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, NavigationComponent, FriendsComponent, LanguageSelectorComponent, BsSelectComponent, BsSelectDirective],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FormsModule
  ],
  exports: [FooterComponent, HeaderComponent, LanguageSelectorComponent]
})
export class LayoutModule { }
