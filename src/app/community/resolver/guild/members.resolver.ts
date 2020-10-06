import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GuildService} from '../../service/guild.service';
import {MemberPagination} from '../../model/guild/member';

@Injectable({providedIn: 'root'})
export class CommunityGuildMembersResolver implements Resolve<MemberPagination> {
  constructor(
    private groupService: GuildService
  ) {
  }

  /**
   * Gets 6 group members and pass the data to the component
   * @param route
   * @param state
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<MemberPagination> {
    return this.groupService.members(route.params.id);
  }
}
