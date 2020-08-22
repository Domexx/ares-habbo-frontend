import {Component, OnDestroy, OnInit} from '@angular/core';
import * as swfobject from 'es-swfobject';
import {client, environment} from '../../../environments/environment';
import {NavigationStart, Router} from '@angular/router';
import {TitleService} from '../../services/title.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import { Location } from '@angular/common';

declare var $;

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
  ticketSubscription: Subscription;

  isActive = false;

  constructor(
    private router: Router,
    private titleService: TitleService,
    private userService: UserService,
    private location: Location
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/client') {
          $('ares-client').css({
            'z-index': 9999,
            opacity: 1
          });

          this.titleService.setTitle('Hotel');
        } else {
          $('ares-client').css({
            'z-index': -1,
            opacity: 0
          });
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.isActive) {
      return;
    }

    this.ticketSubscription = this.userService.ticket().subscribe({
      next: (ticket: string) => {
        const el = document.getElementById('client');

        client.vars['sso.ticket'] = ticket;

        swfobject.embedSWF(client.swf,
          el,
          '100%',
          '100%',
          11,
          client.express,
          client.vars,
          client.params);

        window.FlashExternalInterface = {};
        window.FlashExternalGameInterface = {};

        window.FlashExternalInterface.logLoginStep = (e: any) => {
          if (e === 'client.init.localization.loaded') {
            if (!this.isActive) {
              this.isActive = true;
            }
          }

          window.FlashExternalInterface.disconnect = () => {
            $('#disconnected').css('display', 'block');
          };
        };
      },
      error: () => $('#disconnected').css('display', 'block')
    });
  }

  back() {
    this.location.back();
  }

  ngOnDestroy(): void {

  }

}
