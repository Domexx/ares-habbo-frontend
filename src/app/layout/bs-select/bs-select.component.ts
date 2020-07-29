import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BsSelectDirective} from './bs-select.directive';

@Component({
  selector: 'ares-bs-select',
  templateUrl: './bs-select.component.html'
})
export class BsSelectComponent implements AfterViewInit {

  @ViewChild(BsSelectDirective)
  bootstrapSelectDirective: BsSelectDirective;

  private options$: any[];
  private optGroups$: any[];
  private title$: string;
  private activeValue$;

  private mySelections$: any | any[];

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.activeValue$) {
        this.bootstrapSelectDirective.activeValue(this.activeValue$);
        this.bootstrapSelectDirective.refresh();
      }
    });
  }

  @Input()
  public set mySelections(value: any | any[]) {
    this.mySelections$ = value;
    this.mySelectionsChange.emit(value);


    setTimeout(() => {
      this.bootstrapSelectDirective.refresh();
    });
  }

  public get mySelections() {
    return this.mySelections$;
  }

  @Output()
  public mySelectionsChange = new EventEmitter();

  @Input()
  set options(options: any[]) {
    this.options$ = options;
    setTimeout(() => {
      this.bootstrapSelectDirective.refresh();
    });
  }

  @Input()
  set title(title: string) {
    this.title$ = title;
  }

  @Input()
  set optGroups(optGroups: any) {
    this.optGroups$ = optGroups;
  }

  @Input()
  set activeValue(value: string) {
    this.activeValue$ = value;
  }

  get options() {
    return this.options$;
  }

  get optGroups() {
    return this.optGroups$;
  }

  get title(): string {
    return this.title$;
  }

  get activeValue(): string {
    return this.activeValue$;
  }

  selectOptionById(id) {
    this.bootstrapSelectDirective.selectOptionById(id);
  }
}
