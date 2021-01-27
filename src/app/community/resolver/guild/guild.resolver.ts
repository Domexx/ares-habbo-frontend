import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Guild } from '../../model/guild/guild';
import { GuildService } from '../../service/guild.service';

@Injectable({ providedIn: 'root' })
export class CommunityGuildResolver implements Resolve<Guild | boolean> {
  constructor(private guildService: GuildService, private router: Router) {}

  /**
   * Gets the guild data and pass it to the component
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot): Observable<Guild | boolean> {
    return this.guildService
      .get(route.params.id)
      .pipe(catchError((err) => this.router.navigateByUrl('/404')));
  }
}
