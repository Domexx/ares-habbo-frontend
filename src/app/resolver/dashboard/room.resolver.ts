import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RoomService} from '../../services/room.service';
import {Room} from '../../models/room/room';

@Injectable({ providedIn: 'root' })
export class DashboardRoomResolver implements Resolve<Room> {
  constructor(private roomService: RoomService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Room> {
    return this.roomService.mostVisited();
  }
}
