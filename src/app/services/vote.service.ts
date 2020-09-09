import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {EntityType, Vote, VoteType} from '../models/vote';
import {map} from 'rxjs/operators';
import {API} from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private readonly votesSubject: BehaviorSubject<Vote[]>;
  public votes$: Observable<Vote[]>;

  constructor(private apiService: ApiService) {
    this.votesSubject = new BehaviorSubject<Vote[]>(JSON.parse(localStorage.getItem('ares-votes')));
    this.votes$ = this.votesSubject.asObservable();
  }

  create(entity: number, voteEntity: EntityType, voteType: VoteType): Observable<Vote> {
    return this.apiService.post('votes/create', {
      entity_id: entity,
      vote_entity: voteEntity,
      vote_type: voteType
    }, {}, false).pipe(
      map((resp: API) => {
        if (resp.data) {
          const vote = new Vote();
          vote.id = resp.data.id;
          vote.entity_id = entity;
          vote.vote_entity = voteEntity;
          vote.vote_type = voteType;

          const votes = this.votes;
          votes.push(vote);

          this.votes = votes;
        }

        return resp.data;
      })
    );
  }

  total(): Observable<Vote> {
    return this.apiService.get('votes/total', {}, false).pipe(
      map((resp: API) => {
        this.votes = resp.data;
        return resp.data;
      })
    );
  }

  delete(entity: number, voteEntity: EntityType, voteType: VoteType): Observable<boolean> {
    return this.apiService.post('votes/delete', {
      entity_id: entity,
      vote_entity: voteEntity,
      vote_type: voteType
    }, false, false).pipe(
      map((resp: API) => {
        if (resp.data) {
          const voteIndex = this.votes.findIndex(
            vote =>
              vote.entity_id === entity &&
              vote.vote_entity === voteEntity &&
              vote.vote_type === voteType
          );

          const votes = this.votes;
          votes.splice(voteIndex, 1);

          this.votes = votes;
        }

        return resp.data;
      })
    );
  }

  exists(entity: number, voteEntity: EntityType, voteType: VoteType): boolean {
    return this.votes.filter(
      value => value.entity_id === entity
        && value.vote_entity === voteEntity
        && value.vote_type === voteType
    ).length !== 0;
  }

  set votes(value: Vote[]) {
    localStorage.setItem('ares-votes', JSON.stringify(value));
    this.votesSubject.next(value);
  }

  get votes(): Vote[] {
    return this.votesSubject.value;
  }
}
