import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { client } from '../../../environments/environment';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TitleService } from '../../_service/title.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../_service/user.service';
import { Location } from '@angular/common';
import { ClientService } from '../service/client.service';

declare global {
  interface Window {
    FlashExternalInterface: any;
    FlashExternalGameInterface: any;
  }
}

@Component({
  selector: 'ares-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription;

  isFlashActivated = false;
  isSessionActive = false;
  isDisconnected = false;

  previousUrl: string;

  /**
   * @private
   * @property
   */
  private nitroApplication: HTMLElement;

  /**
   * @private
   * @property
   */
  private style: HTMLLinkElement;

  /**
   * @private
   * @property
   */
  private runtime: HTMLScriptElement;

  /**
   * @private
   * @property
   */
  private main: HTMLScriptElement;

  /**
   * @private
   * @property
   */
  private polyfills: HTMLScriptElement;

  /**
   * @private
   * @property
   */
  private vendor: HTMLScriptElement;

  constructor(
    private router: Router,
    private titleService: TitleService,
    private clientService: ClientService,
    private userService: UserService,
    private elementRef: ElementRef
  ) {}

  /**
   * Initialize the Client component
   */
  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/client') {
          if (this.isDisconnected) {
            this.reload();
          }

          this.elementRef.nativeElement.style.zIndex = 9999;
          this.elementRef.nativeElement.style.opacity = 1;

          if (!this.style) {
            this.style = document.createElement('link');
            this.style.rel = 'stylesheet';
            this.style.href = client.style;
            this.elementRef.nativeElement.appendChild(this.style);
          }

          this.titleService.setTitle('Hotel');
        } else {
          this.elementRef.nativeElement.style.zIndex = -1;
          this.elementRef.nativeElement.style.opacity = 0;

          if (this.style) {
            this.style.disabled = true;
          }
        }
      }

      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects !== '/client') {
          this.previousUrl = event.urlAfterRedirects;
        }
      }
    });

    this.isSessionActive = this.userService.user.online === 1;

    if (!this.isSessionActive) {
      this.loadClient();
    }
  }

  /**
   * Get SSO ticket and initialize client
   *
   * @private
   */
  private loadClient(): void {
    const ticketSubscription: Subscription = this.clientService
      .ticket()
      .subscribe({
        next: (sso: string) => {
          (window as any).NitroConfig = {
            configurationUrl: client.configurationUrl,
            sso,
          };

          this.initNitro();
        },
        error: () => (this.isDisconnected = true),
        complete: () => ticketSubscription.unsubscribe(),
      });
  }

  /**
   * Removes the client object element and "replaces" it with a div
   */
  private resetClient(): void {
    this.nitroApplication.remove();
    this.main.remove();
    this.polyfills.remove();
    this.vendor.remove();
    this.runtime.remove();

    this.nitroApplication = undefined;
    this.runtime = undefined;
    this.polyfills = undefined;
    this.vendor = undefined;
    this.main = undefined;

    this.initNitro();
  }

  /**
   * Initialize Nitro client
   *
   * @private
   */
  private initNitro(): void {
    if (!this.nitroApplication) {
      this.nitroApplication = document.createElement('app-root');
      this.nitroApplication.id = 'client';
      this.elementRef.nativeElement.appendChild(this.nitroApplication);
    }

    if (!this.runtime) {
      this.runtime = document.createElement('script');
      this.runtime.type = 'text/javascript';
      this.runtime.src = client.runtime;
      this.elementRef.nativeElement.appendChild(this.runtime);
    }

    if (!this.polyfills) {
      this.polyfills = document.createElement('script');
      this.polyfills.type = 'text/javascript';
      this.polyfills.src = client.polyfills;
      this.elementRef.nativeElement.appendChild(this.polyfills);
    }

    if (!this.vendor) {
      this.vendor = document.createElement('script');
      this.vendor.type = 'text/javascript';
      this.vendor.src = client.vendor;
      this.elementRef.nativeElement.appendChild(this.vendor);
    }

    if (!this.main) {
      this.main = document.createElement('script');
      this.main.type = 'text/javascript';
      this.main.src = client.main;
      this.elementRef.nativeElement.appendChild(this.main);
    }
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
