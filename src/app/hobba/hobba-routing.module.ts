import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './component/settings/settings.component';
import { HobbaSettingsResolver } from './resolver/settings.resolver';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    resolve: {
      settings: HobbaSettingsResolver,
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HobbaRoutingModule {}
