import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {faUnlink} from "@fortawesome/free-solid-svg-icons/faUnlink";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class IconModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faSearch, faUnlink);
  }
}
