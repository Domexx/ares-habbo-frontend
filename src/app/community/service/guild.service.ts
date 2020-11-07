import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../_service/api.service';
import { Observable } from 'rxjs';
import { Guild } from '../model/guild/guild';
import { User } from '../../_shared/model/user/user';
import { TranslateService } from '@ngx-translate/core';
import { MemberPagination } from '../model/guild/member';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuildService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private translateService: TranslateService
  ) {}

  /**
   * Get guild by id
   * @param id
   * @return Observable<Guild>
   */
  get(id: number): Observable<Guild> {
    return this.apiService.get(`guilds/${id}`).pipe(map((resp) => resp.data));
  }

  /**
   * Gets the guild which has the most members
   * @return Observable<Guild>
   */
  mostMembers(): Observable<Guild> {
    return this.apiService
      .get('guilds/most/members')
      .pipe(map((resp) => resp.data));
  }

  /**
   * Gets members of a guild
   * @param id
   * @param page
   * @param results
   * @return Observable<MemberPagination>
   */
  members(
    id: number,
    page: number = 1,
    results: number = 6
  ): Observable<MemberPagination> {
    return this.apiService
      .get(`guilds/members/${id}/list/${page}/${results}`, {}, false)
      .pipe(
        map((resp) => {
          if (resp.data.data.length < 6) {
            for (let i = resp.data.data.length; i < 6; i++) {
              resp.data.data.push({
                user: this.mannequin(),
              });
            }
          }

          return resp.data;
        })
      );
  }

  /**
   * Creates a temporary guild
   * @return Guild
   */
  fakeGuild(): Guild {
    const guild = new Guild();

    guild.badge = null;
    guild.user = null;
    guild.date_created = null;
    guild.id = 0;
    guild.name = this.translateService.instant('DASHBOARD.GUILD.TITLE');
    guild.description = this.translateService.instant(
      'DASHBOARD.GUILD.DESCRIPTION'
    );
    guild.member_count = 0;

    return guild;
  }

  /**
   * Creates a mannequin user
   * @return User
   */
  mannequin(): User {
    const mannequin = new User();

    mannequin.id = 0;
    mannequin.username = this.translateService.instant(
      'COMMUNITY.GUILD.MEMBERS.MANNEQUIN.NAME'
    );
    mannequin.motto = this.translateService.instant(
      'COMMUNITY.GUILD.MEMBERS.MANNEQUIN.MOTTO'
    );
    mannequin.look = null;
    mannequin.online = -1;

    return mannequin;
  }
}
