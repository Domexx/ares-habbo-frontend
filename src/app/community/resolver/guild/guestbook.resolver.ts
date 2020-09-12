import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {GuestbookPagination} from '../../../_shared/model/guestbook';
import {GuestbookService} from '../../../_shared/service/guestbook.service';

@Injectable({ providedIn: 'root' })
export class CommunityGuildGuestbookResolver implements Resolve<GuestbookPagination> {
  constructor(
    private guestbookService: GuestbookService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuestbookPagination> {
    return this.guestbookService.getGuildEntries(route.params.id);
  }
}
