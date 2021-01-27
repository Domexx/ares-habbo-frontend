/**
 * Ares (https://ares.to)
 *
 * @license https://gitlab.com/arescms/ares-frontend/LICENSE (MIT License)
 */

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {EmployeesService} from '../service/employees.service';
import {PermissionRank} from '../model/permission-rank.model';

@Injectable({providedIn: 'root'})
export class EmployeesResolver implements Resolve<PermissionRank[]> {

  constructor(private employeesService: EmployeesService) {
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
  ): Observable<PermissionRank[]> {
    return this.employeesService.get();
  }
}



