import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {GuildService} from '../../community/service/guild.service';
import {Guild} from '../../community/model/guild/guild';

@Injectable({ providedIn: 'root' })
export class DashboardGuildResolver implements Resolve<Guild | boolean> {
  constructor(private guildService: GuildService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Guild | boolean> {
    return this.guildService.mostMembers().pipe(
      catchError(() => of(false))
    );
  }
}
