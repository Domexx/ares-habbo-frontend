import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {GroupService} from '../../services/group.service';
import {Guild} from '../../models/guild/guild';

@Injectable({ providedIn: 'root' })
export class DashboardGuildResolver implements Resolve<Guild> {
  constructor(private guildService: GroupService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Guild> {
    return this.guildService.mostMembers();
  }
}
