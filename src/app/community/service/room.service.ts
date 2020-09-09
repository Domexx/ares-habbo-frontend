import { Injectable } from '@angular/core';
import {ApiService} from '../../_shared/service/api.service';
import {Observable} from 'rxjs';
import {Room} from '../model/room';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private apiService: ApiService) { }

  mostVisited(): Observable<Room> {
    return this.apiService.get('rooms/most/visited').pipe(
      map(value => value.data)
    );
  }
}
