import { UserOfHotelService } from './../service/user-of-hotel.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Setting } from '../../_shared/model/setting';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_shared/model/user/user';

@Injectable({ providedIn: 'root' })
export class DashboardUserOfHotelResolver implements Resolve<User> {
  constructor(private userOfHotelService: UserOfHotelService) {}

  /**
   * Gets the configured Discord URL and passes the URL to the component
   * @param route
   * @return Observable<Setting>
   */
  resolve(): Observable<User> {
    return this.userOfHotelService.get().pipe(
      map((resp) => {
        return resp;
      })
    );
  }
}
