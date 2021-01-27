import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RegisterService} from '../service/register.service';

@Injectable({providedIn: 'root'})
export class RegisterLookResolver implements Resolve<{ boys: [], girls: [] }> {
  constructor(private registerService: RegisterService) {
  }

  /**
   * Gets the pre-configured looks from the backend
   * and stores the data for the component
   * @param route
   * @param state
   * @return Observable<{ boys: [], girls: [] }>
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ boys: [], girls: [] }> {
    return this.registerService.looks().pipe(
      map(resp => resp.data.looks)
    );
  }
}
