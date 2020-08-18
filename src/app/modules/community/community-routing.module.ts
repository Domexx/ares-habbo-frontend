import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommunityComponent} from '../../components/community/community.component';
import {AuthGuard} from '../../guards/auth.guard';
import {GroupComponent} from "../../components/community/group/group.component";

const routes: Routes = [
  {
    path: '',
    component: CommunityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'group/:id',
    component: GroupComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
