import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {RoomService} from '../../community/service/room.service';
import {Room} from '../../community/model/room';
import {catchError} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
/**
 * @class DashboardRoomResolver
 */
export class DashboardRoomResolver implements Resolve<Room | boolean> {
  /**
   * DashboardRoomResolver constructor
   *
   * @param roomService
   */
  constructor(private roomService: RoomService) {}

  /**
   * @param route
   * @param state
   * @returns Observable<Room | boolean>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Room | boolean> {
    return this.roomService.mostVisited().pipe(
      catchError(() => of(false))
    );
  }
}
