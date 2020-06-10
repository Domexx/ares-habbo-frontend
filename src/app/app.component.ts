import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public userService: UserService,
              private languageService: LanguageService) { }

  ngOnInit(): void {
    
  }
}
