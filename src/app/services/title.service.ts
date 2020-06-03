import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  
  constructor(private TITLE: Title) { }

  get title(): string {
    return this.TITLE.getTitle();
  }

  setTitle(value: string): void {
    this.TITLE.setTitle(`${environment.app.title} ${value}`);
  }
}
