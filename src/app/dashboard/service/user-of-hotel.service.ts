import { User } from 'src/app/_shared/model/user/user';
import { API } from './../../_shared/model/api';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './../../_service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserOfHotelService {
  constructor(private apiService: ApiService) {}

  /**
   * Gets the user of the hotel
   *
   * @return Observable<User>
   */
  get(): Observable<User> {
    return this.apiService
      .get('user-of-the-hotel')
      .pipe(map((resp) => resp.data.user));
  }
}
