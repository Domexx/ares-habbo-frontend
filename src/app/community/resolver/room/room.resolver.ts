/*
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 *
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Room} from '../../model/room';
import {RoomService} from '../../service/room.service';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CommunityRoomResolver implements Resolve<Room | boolean> {
  constructor(
    private roomService: RoomService,
    private router: Router
  ) {
  }

  /**
   * Gets 4 guestbook entries and pass the data to the component
   * @param route
   * @param state
   * @return Observable<Room>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Room | boolean> {
    return this.roomService.get(route.params.id).pipe(
      catchError((err, caught) => this.router.navigateByUrl('404'))
    );
  }
}

