import {Component, ElementRef, NgZone, OnDestroy, OnInit} from '@angular/core';
import {client} from '../../../environments/environment';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {TitleService} from '../../_service/title.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../_service/user.service';
import {Location} from '@angular/common';
import {ClientService} from '../service/client.service';
import * as FlashDetect from 'flash-detect';
import * as swfObject from 'es-swfobject';

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

  /**
   * Initialize the Client component
   */
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

    if (!this.isSessionActive) {
      this.loadClient();
    }
  }

  /**
   * Loads the client if the SSO ticket request were successfully
   */
  loadClient(): void {
    const ticketSubscription: Subscription = this.clientService.ticket().subscribe({
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
      error: () => this.isDisconnected = true,
      complete: () => ticketSubscription.unsubscribe()
    });
  }

  /**
   * Removes the client object element and "replaces" it with a div
   */
  resetClient(): void {
    this.elementRef.nativeElement.removeChild(document.getElementById('game'));

    const game = document.createElement('div');
    game.setAttribute('id', 'game');

    this.elementRef.nativeElement.appendChild(game);
  }

  /**
   * Resets the client and reload the client
   */
  reload(): void {
    this.isDisconnected = false;

    this.resetClient();
    this.loadClient();
  }

  /**
   * Overrides a existing client session
   */
  overrideSession() {
    this.isSessionActive = false;
    this.loadClient();
  }

  /**
   * Destroys the Client component
   */
  ngOnDestroy(): void {
    if (this.routerSubscription && !this.routerSubscription.unsubscribe) {
      this.routerSubscription.unsubscribe();
    }
  }

}
