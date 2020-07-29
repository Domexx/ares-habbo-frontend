import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { NavigationComponent } from '../../layout/header/navigation/navigation.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FriendsComponent } from '../../layout/dashboard/friends/friends.component';
import {LanguageSelectorComponent} from '../../layout/language-selector/language-selector.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, NavigationComponent, FriendsComponent, LanguageSelectorComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    FormsModule
  ],
  exports: [FooterComponent, HeaderComponent, LanguageSelectorComponent]
})
export class LayoutModule { }
