import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ApiService} from '../../_service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private apiService: ApiService) {
  }

  /**
   * Gets the SSO ticket
   * @return Observable<string>
   */
  ticket(): Observable<string> {
    return this.apiService.put('user/ticket', {}, {}, false).pipe(
      map(response => response.data.ticket)
    );
  }

  /**
   * Gets the current user counter
   * @return Observable<number>
   */
  counter(): Observable<number> {
    return this.apiService.get('user/online').pipe(
      map(response => response.data.count)
    );
  }
}
