import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../../../_shared/model/user/user';
import {FriendService} from '../../service/friend.service';

@Pipe({
  name: 'searchFriend'
})
export class SearchPipe implements PipeTransform {

  constructor(private friendService: FriendService) { }


  transform(value: User[], args?: string): User[] {
    if (!args) {
      return value;
    }

    args = args.toLowerCase();

    return value.filter((item) => {
      return item.username.toLowerCase().includes(args);
    });
  }

}
