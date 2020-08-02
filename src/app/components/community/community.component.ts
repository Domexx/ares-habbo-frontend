import { Component, OnInit } from '@angular/core';
import {PreloaderService} from "../../services/preloader.service";

@Component({
  selector: 'ares-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  providers: [PreloaderService]
})
export class CommunityComponent implements OnInit {

  constructor(private preloaderService: PreloaderService) { }

  ngOnInit(): void {

  }

}
