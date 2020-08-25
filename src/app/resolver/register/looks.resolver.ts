import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RegisterService} from '../../services/register.service';

@Injectable({ providedIn: 'root' })
export class RegisterLookResolver implements Resolve<{ boys: [], girls: [] }> {
  constructor(private registerService: RegisterService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{ boys: [], girls: [] }> {
    return this.registerService.looks().pipe(
      map(resp => resp.data.looks)
    );
  }
}
