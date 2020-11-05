import {Injectable} from '@angular/core';
import {ApiService} from '../../_service/api.service';
import {Observable} from 'rxjs';
import {API, APIPagination} from '../../_shared/model/api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private apiService: ApiService) {
  }

  /**
   * Makes a post request to "register"
   * @param value
   * @return Observable<API>
   */
  register(value: object): Observable<API> {
    return this.apiService.post('register', value);
  }

  /**
   * Gets the pre-configured looks from the backend
   * @return Observable<API>
   */
  looks(): Observable<API | APIPagination> {
    return this.apiService.get('register/looks');
  }
}
