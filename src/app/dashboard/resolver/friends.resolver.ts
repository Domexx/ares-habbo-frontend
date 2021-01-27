import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {FriendPagination} from '../model/friend';
import {FriendService} from '../../_layout/service/friend.service';
import {catchError} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
/**
 * @class DashboardFriendResolver
 */
export class DashboardFriendResolver implements Resolve<FriendPagination> {
  /**
   * DashboardFriendResolver constructor
   *
   * @param friendService
   */
  constructor(private friendService: FriendService) {}

  /**
   * @param route
   * @param state
   * @returns Observable<FriendPagination>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<FriendPagination> {
    return this.friendService.list().pipe(
      catchError(err => [])
    );
  }
}
