import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Guild} from '../../../models/guild/guild';
import {GuildService} from '../../../services/guild.service';

@Injectable({ providedIn: 'root' })
export class CommunityGuildResolver implements Resolve<Guild | boolean> {
  constructor(
    private groupService: GuildService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Guild | boolean> {
    return this.groupService.get(route.params.id).pipe(
      catchError(err => this.router.navigateByUrl('/404'))
    );
  }
}
