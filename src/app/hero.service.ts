import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, of, take, throwError } from 'rxjs';

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

  getHero(id: number): Observable<Hero | undefined> {
    return this.heroes.pipe(
      map((heroes) => heroes.find((hero) => hero.id === id)),
      take(1),
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

  updateHero(hero: Hero): Observable<Hero> {
    if (!this.heroes.value.some((current) => current.id === hero.id)) {
      return throwError(() => new Error(`Hero with id ${hero.id} was not found.`));
    }

    this.heroes.next(
      this.heroes.value.map((current) => (current.id === hero.id ? { ...hero } : current)),
    );
    return of(hero);
  }

  deleteHero(id: number): Observable<void> {
    if (!this.heroes.value.some((hero) => hero.id === id)) {
      return throwError(() => new Error(`Hero with id ${id} was not found.`));
    }

    this.heroes.next(this.heroes.value.filter((hero) => hero.id !== id));
    return of(undefined);
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
