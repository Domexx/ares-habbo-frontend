import {Component, Input, OnInit} from '@angular/core';
import {Comment} from '../../../../models/article/comment';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'ares-layout-community-article-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments$: Comment[] = [];

  @Input('comments')
  set comments(value: Comment[]) {
    this.comments$ = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

  look(look: string): string {
    return `${environment.app.imager}${look}&action=std&gesture=sml&direction=2&head_direction=2&size=l`;
  }

}
