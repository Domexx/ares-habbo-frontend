import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GuildService} from '../../../services/guild.service';
import {MemberPagination} from '../../../models/guild/member';

@Injectable({ providedIn: 'root' })
export class CommunityGuildMembersResolver implements Resolve<MemberPagination> {
  constructor(
    private groupService: GuildService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MemberPagination> {
    return this.groupService.members(route.params.id);
  }
}
