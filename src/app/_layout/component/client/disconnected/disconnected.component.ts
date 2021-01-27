import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {AlertService} from '../../../../_shared/service/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ares-layout-client-disconnected',
  templateUrl: './disconnected.component.html',
  styleUrls: ['./disconnected.component.scss']
})
export class DisconnectedComponent {

  @Input('disconnected')
  set disconnected(value: boolean) {
    if (value) {
      this.elRef.nativeElement.style.display = 'block';
    } else {
      this.elRef.nativeElement.style.display = 'none';
    }
  }

  @Output('reload')
  reload: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private elRef: ElementRef,
    private alertService: AlertService,
    private router: Router
  ) { }

  reloadClient() {
    this.reload.emit(true);
  }
}
