import { Injectable } from '@angular/core';
import { ApiService } from '../../_service/api.service';
import { map } from 'rxjs/operators';
import { API } from '../model/api';
import { Observable } from 'rxjs';
import {
  Guestbook,
  GuestbookEntity,
  GuestbookPagination,
} from '../model/guestbook';

@Injectable({
  providedIn: 'root',
})
export class GuestbookService {
  constructor(private apiService: ApiService) {}

  getGuildEntries(
    id: number,
    page: number = 1,
    results: number = 4
  ): Observable<GuestbookPagination> {
    return this.apiService
      .get(`guestbook/guild/${id}/list/${page}/${results}`, {}, false)
      .pipe(map((resp: API) => resp.data));
  }

  getProfileEntries(
    id: number,
    page: number = 1,
    results: number = 4
  ): Observable<Guestbook[]> {
    return this.apiService
      .get(`guestbook/profile/${id}/list/${page}/${results}`, {}, false)
      .pipe(map((resp: API) => resp.data));
  }

  create(
    id: number,
    content: string,
    entity: GuestbookEntity
  ): Observable<Guestbook> {
    if (entity === GuestbookEntity.GUILD) {
      return this.apiService
        .post('guestbook/create', {
          content,
          guild_id: id,
        })
        .pipe(map((resp: API) => resp.data));
    }

    return this.apiService
      .post('guestbook/create', {
        content,
        profile: id,
      })
      .pipe(map((resp: API) => resp.data));
  }
}
