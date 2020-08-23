import {Component, ElementRef, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as swfObject from 'es-swfobject';
import {client, environment} from '../../../environments/environment';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {TitleService} from '../../services/title.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import { Location } from '@angular/common';
import {ClientService} from '../../services/client.service';
import * as FlashDetect from 'flash-detect';

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

  isFlashActivated = false;
  isSessionActive = false;
  isDisconnected = false;

  previousUrl: string;

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
    const flashDetected = new FlashDetect();

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/client') {
          if (this.isDisconnected) {
            this.reload();
          }

          this.elementRef.nativeElement.style.zIndex = 9999;
          this.elementRef.nativeElement.style.opacity = 1;

          this.titleService.setTitle('Hotel');
        } else {
          this.elementRef.nativeElement.style.zIndex = -1;
          this.elementRef.nativeElement.style.opacity = 0;
        }
      }

      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects !== '/client') {
          this.previousUrl = event.urlAfterRedirects;
        }
      }
    });

    this.isFlashActivated = flashDetected.installed;
    this.isSessionActive = this.userService.user.online === 1;

    if (this.userService.user.online === 0) {
      this.loadClient();
    }
  }

  loadClient(): void {
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

  resetClient(): void {
    this.elementRef.nativeElement.removeChild(document.getElementById('game'));

    const game = document.createElement('div');
    game.setAttribute('id', 'game');

    this.elementRef.nativeElement.appendChild(game);
  }

  reload(): void {
    this.isDisconnected = false;

    this.resetClient();
    this.loadClient();
  }

  overrideSession() {
    this.isSessionActive = false;
    this.loadClient();
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
