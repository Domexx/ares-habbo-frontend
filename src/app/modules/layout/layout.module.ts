import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { NavigationComponent } from '../../layout/header/navigation/navigation.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, NavigationComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  exports: [FooterComponent, HeaderComponent]
})
export class LayoutModule { }
