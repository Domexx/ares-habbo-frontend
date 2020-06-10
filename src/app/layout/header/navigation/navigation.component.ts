import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  hotelName: string;

  constructor() { }

  ngOnInit(): void {
    this.hotelName = environment.app.hotelName;
  }

}
