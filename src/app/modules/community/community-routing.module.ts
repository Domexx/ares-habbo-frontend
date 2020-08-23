import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityComponent} from '../../components/community/community.component';
import {GroupComponent} from '../../components/community/group/group.component';

const routes: Routes = [
  {
    path: '',
    component: CommunityComponent,
  },
  {
    path: 'group/:id',
    component: GroupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
