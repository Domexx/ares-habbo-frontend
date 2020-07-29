import {Directive, ElementRef, OnInit, OnDestroy, ContentChild, ViewChildren} from '@angular/core';

declare var $: any;

@Directive({
  selector: '[bsSelect]'
})
export class BsSelectDirective implements OnInit, OnDestroy {
  constructor(private ref: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      $(this.ref.nativeElement).selectpicker();
    });
  }

  ngOnDestroy() {
    $(this.ref.nativeElement).selectpicker('destroy');
  }

  refresh() {
    $(this.ref.nativeElement).selectpicker('refresh');
  }

  activeValue(value: string) {
    $(this.ref.nativeElement).val(value);
    this.refresh();
  }

  triggerChangeEvent() {
    this.ref.nativeElement.dispatchEvent(new Event('change', {bubbles: true}));
  }

  selectOptionById(id) {
    const option = $(this.ref.nativeElement).find('#'.concat(id));
    option.prop('selected', true);

    this.triggerChangeEvent();
  }
}
