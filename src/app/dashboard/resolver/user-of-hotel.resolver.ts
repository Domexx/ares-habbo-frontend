import { UserOfHotelService } from '../service/user-of-hotel.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Setting } from '../../_shared/model/setting';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/_shared/model/user/user';
import { UserService } from '../../_service/user.service';

@Injectable({ providedIn: 'root' })
/**
 * @class DashboardUserOfHotelResolver
 */
export class DashboardUserOfHotelResolver implements Resolve<User | boolean> {

  /**
   * DashboardUserOfHotelResolver constructor
   *
   * @param userOfHotelService
   */
  constructor(
    private userOfHotelService: UserOfHotelService,
    private userService: UserService
  ) {}

  /**
   * @param route
   * @returns Observable<Setting>
   */
  resolve(): Observable<User | boolean> {
    return this.userOfHotelService.get().pipe(
      map(resp => resp),
      catchError(() => of(false))
    );
  }
}
