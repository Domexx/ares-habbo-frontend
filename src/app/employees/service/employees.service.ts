import {Injectable} from '@angular/core';;
import {Observable} from 'rxjs';
import {PermissionRank} from '../model/permission-rank.model';
import {ApiService} from '../../_service/api.service';
import {map} from 'rxjs/operators';
import {UserService} from '../../_service/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private api: ApiService,
    private userService: UserService
  ) {
  }

  get(): Observable<PermissionRank[]> {
    return this.api.get('permissions/staff/list').pipe(
      map(value => value.data)
    );
  }
}
