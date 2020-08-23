import {Component, ElementRef, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as swfObject from 'es-swfobject';
import {client, environment} from '../../../environments/environment';
import {NavigationStart, Router} from '@angular/router';
import {TitleService} from '../../services/title.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import { Location } from '@angular/common';
import {ClientService} from '../../services/client.service';

declare global {
  interface Window {
    FlashExternalInterface: any;
    FlashExternalGameInterface: any;
  }
}

@Component({
  selector: 'ares-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription;
  ticketSubscription: Subscription;

  hotelName: string = environment.app.hotelName || 'Ares';
  isDisconnected = false;

  constructor(
    private router: Router,
    private titleService: TitleService,
    private clientService: ClientService,
    private userService: UserService,
    private location: Location,
    private zone: NgZone,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/client') {
          this.elementRef.nativeElement.style.zIndex = 9999;
          this.elementRef.nativeElement.style.opacity = 1;

          this.titleService.setTitle('Hotel');
          return;
        }

        this.elementRef.nativeElement.style.zIndex = -1;
        this.elementRef.nativeElement.style.opacity = 0;
      }
    });

    if (this.userService.user.online === 0) {
      this.ticketSubscription = this.clientService.ticket().subscribe({
        next: (ticket: string) => {
          client.vars['sso.ticket'] = ticket;

          swfObject.embedSWF(client.swf,
            document.getElementById('game'),
            '100%',
            '100%',
            11,
            '',
            client.vars,
            client.params);

          window.FlashExternalInterface = {};
          window.FlashExternalGameInterface = {};

          window.FlashExternalInterface.logLoginStep = (e: any) => {
            window.FlashExternalInterface.disconnect = () => this.zone.run(() => this.isDisconnected = true);
          };
        },
        error: () => this.isDisconnected = true
      });
    }
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe) {
      this.routerSubscription.unsubscribe();
    }

    if (this.ticketSubscription && !this.ticketSubscription.unsubscribe) {
      this.ticketSubscription.unsubscribe();
    }
  }

}
