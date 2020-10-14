import {Injectable} from '@angular/core';
import {ApiService} from '../../_service/api.service';
import {Observable} from 'rxjs';
import {Room} from '../model/room';
import {map} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private apiService: ApiService,
    private translateService: TranslateService
  ) {
  }

  /**
   * Gets the most visited room
   * @return Observable<Room>
   */
  mostVisited(): Observable<Room> {
    return this.apiService.get('rooms/most/visited').pipe(
      map(value => value.data)
    );
  }

  /**
   * Creates a temporary room
   * @return Room
   */
  fakeRoom(): Room {
    const room = new Room();

    room.id = 0;
    room.creator = null;
    room.description = this.translateService.instant('DASHBOARD.ROOM.DESCRIPTION');
    room.name = this.translateService.instant('DASHBOARD.ROOM.TITLE');
    room.users = 0;
    room.score = 0;
    room.users_max = 0;

    return room;
  }
}
