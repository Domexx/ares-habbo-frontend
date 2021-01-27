import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivateChild,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_service/user.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveSessionGuard implements CanActivateChild {
  constructor(private userService: UserService) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.userService.get().subscribe();
    return true;
  }
}
