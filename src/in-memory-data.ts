import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  createDb(): { heroes: Hero[] } {
    return { heroes: HEROES.map((hero) => ({ ...hero })) };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map((hero) => hero.id)) + 1 : 11;
  }
}
