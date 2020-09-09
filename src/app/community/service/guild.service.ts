import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../_shared/service/api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Guild} from '../model/guild/guild';
import {User} from '../../_shared/model/user/user';
import {TranslateService} from '@ngx-translate/core';
import {MemberPagination} from '../model/guild/member';

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private translateService: TranslateService
  ) { }

  get(id: number): Observable<Guild> {
    return this.apiService.get(`guilds/${id}`).pipe(
      map(resp => resp.data)
    );
  }

  mostMembers(): Observable<Guild> {
    return this.apiService.get('guilds/most/members').pipe(
      map(resp => resp.data)
    );
  }

  members(id: number, page: number = 1, results: number = 6): Observable<MemberPagination> {
    return this.apiService.get(`guilds/members/${id}/list/${page}/${results}`, {}, false).pipe(
      map(resp => {
        if (resp.data.members.length < 6) {
          for (let i = resp.data.members.length; i < 6; i++) {
            resp.data.members.push({
              member: this.mannequin()
            });
          }
        }

        return resp.data;
      })
    );
  }

  mannequin(): User {
    const mannequin = new User();

    mannequin.id = 0;
    mannequin.username = this.translateService.instant('COMMUNITY.GUILD.MEMBERS.MANNEQUIN.NAME');
    mannequin.motto = this.translateService.instant('COMMUNITY.GUILD.MEMBERS.MANNEQUIN.MOTTO');
    mannequin.look = null;
    mannequin.online = -1;

    return mannequin;
  }
}
