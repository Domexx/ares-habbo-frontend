import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiService} from '../../_service/api.service';
import {map} from 'rxjs/operators';
import { UserService } from '../../_service/user.service';
import {FriendPagination} from '../../dashboard/model/friend';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  /**
   * FriendService constructor
   *
   * @param http
   * @param apiService
   * @param translateService
   * @param userService
   */
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private translateService: TranslateService,
    private userService: UserService
  ) { }

  /**
   *
   * @param page
   * @param results
   * @return Observable<FriendPagination>
   */
  list(page: number = 1, results: number = 9): Observable<FriendPagination> {
    return this.apiService.get(`friends/list/${page}/${results}`, {}, false).pipe(
      map(resp => {
        for (let i = resp.data.data.length; i < 9; i++) {
          resp.data.data.push(this.userService.mannequin());
        }

        return resp.data;
      })
    );
  }
}
