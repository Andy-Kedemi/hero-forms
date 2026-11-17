import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, of } from 'rxjs';

import { Hero, NewHero } from '../hero';
import { HEROES } from '../mock-heroes';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private readonly heroes = new BehaviorSubject<Hero[]>(
    HEROES.map((hero) => ({ ...hero })),
  );

  getHeroes(): Observable<Hero[]> {
    return this.heroes.asObservable();
  }

  getTopHeroes(limit: number): Observable<Hero[]> {
    return this.heroes.pipe(
      map((heroes) =>
        [...heroes]
          .sort((first, second) => second.searchCount - first.searchCount)
          .slice(0, limit),
      ),
    );
  }

  addHero(hero: NewHero): Observable<Hero> {
    const newHero: Hero = {
      ...hero,
      id: this.heroes.value.reduce((highest, current) => Math.max(highest, current.id), 0) + 1,
      searchCount: 0,
    };
    this.heroes.next([...this.heroes.value, newHero]);
    return of(newHero);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    const normalizedTerm = term.trim().toLocaleLowerCase();
    if (!normalizedTerm) {
      return of([]);
    }

    const matches = this.heroes.value.filter((hero) =>
      [hero.name, hero.alterEgo, hero.power]
        .some((value) => value?.toLocaleLowerCase().includes(normalizedTerm)),
    );
    const matchedIds = new Set(matches.map((hero) => hero.id));
    this.heroes.next(
      this.heroes.value.map((hero) =>
        matchedIds.has(hero.id) ? { ...hero, searchCount: hero.searchCount + 1 } : hero,
      ),
    );
    return of(matches);
  }
}
