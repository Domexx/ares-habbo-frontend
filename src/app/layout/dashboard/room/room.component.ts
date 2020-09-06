import {Component, Input, OnInit} from '@angular/core';
import {Room} from '../../../models/room/room';

@Component({
  selector: 'ares-layout-dashboard-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room$: Room;

  @Input('room')
  set room(value: Room) {
    this.room$ = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
