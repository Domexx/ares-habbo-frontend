import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ares-layout-client-active-session',
  templateUrl: './active-session.component.html',
  styleUrls: ['./active-session.component.scss']
})
export class ActiveSessionComponent {

  @Input('active')
  set active(value: boolean) {
    if (value) {
      this.elRef.nativeElement.style.display = 'flex';
    } else {
      this.elRef.nativeElement.style.display = 'none';
    }
  }

  @Output('load')
  load$: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private elRef: ElementRef) { }

  load(): void {
    this.load$.emit(true);
  }

}
