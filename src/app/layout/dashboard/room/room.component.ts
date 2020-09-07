import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../models/room/room';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'ares-layout-dashboard-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room$: Room;

  thumbnails = environment.app.camera.thumbnails;
  hasThumbnail = true;

  @Input('room')
  set room(value: Room) {
    this.room$ = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

  error(e: any): void {
    this.hasThumbnail = false;
    e.target.src = '/assets/images/dashboard/room.png';
  }

}
