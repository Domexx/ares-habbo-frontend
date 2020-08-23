import {Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'ares-client-disconnected',
  templateUrl: './disconnected.component.html',
  styleUrls: ['./disconnected.component.scss']
})
export class DisconnectedComponent {

  @Input('disconnected')
  set disconnected(value: boolean) {
    if (value) {
      this.elRef.nativeElement.style.display = 'block';
    }
  }

  constructor(private elRef: ElementRef) { }
}
