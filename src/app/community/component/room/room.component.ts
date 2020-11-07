import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../../model/room';

@Component({
  selector: 'ares-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room$: Room;

  thumbnails = environment.app.camera.thumbnails;

  hasRoomThumbnail = true;
  hasGuildBadge = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.room$ = this.route.snapshot.data.room;
  }

  /**
   * Handles room thumbnail error event
   *
   * @param e
   */
  roomThumbnailError(e: any): void {
    this.hasRoomThumbnail = false;
    e.target.src = '/assets/images/dashboard/room.png';
  }

  /**
   * Handles guild badge error event
   *
   * @param e
   */
  guildBadgeError(e: any): void {
    this.hasGuildBadge = false;
    e.target.src = '/assets/images/icons/ares64x64.png';
  }

  /**
   * Return room thumbnail path
   *
   * @return string
   */
  get roomThumbnail(): string {
    return `${environment.app.camera.thumbnails}${this.room$.id}.png`;
  }

  /**
   * Return the badge image path
   *
   * @return string
   */
  get guildBadge(): string {
    return `${environment.app.badgeParts}${this.room$.guild.badge}.png`;
  }

}
