import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'ares-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  hotelName: string;

  constructor() { }

  ngOnInit(): void {
    this.hotelName = environment.app.hotelName;
  }

}
