import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import type { Hero, NewHero } from '../../hero';
import { MessageService } from '../../message';
import { HeroService } from '../hero.service';
import { HeroCreateModalComponent } from '../hero-create-modal/hero-create-modal';
import { HeroDetailModalComponent } from '../hero-detail-modal/hero-detail-modal';

type ViewMode = 'grid' | 'list';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [AsyncPipe, FormsModule, HeroCreateModalComponent, HeroDetailModalComponent],
  templateUrl: './heroes.html',
  styleUrl: './heroes.css',
})
export class HeroesComponent {
  private readonly heroService = inject(HeroService);
  private readonly messageService = inject(MessageService);

  readonly heroes$: Observable<Hero[]> = this.heroService.getHeroes();
  readonly view = signal<ViewMode>('grid'); // grid is the default
  searchTerm = '';
  selectedHero: Hero | null = null;
  isAddModalOpen = false;

  search(term: string): void {
    this.searchTerm = term;
  }

  filterHeroes(heroes: Hero[]): Hero[] {
    const term = this.searchTerm.trim().toLocaleLowerCase();
    if (!term) {
      return heroes;
    }

    return heroes.filter((hero) =>
      [hero.name, hero.alterEgo, hero.power].some((value) =>
        value?.toLocaleLowerCase().includes(term),
      ),
    );
  }

  addHero(hero: NewHero): void {
    this.heroService.addHero(hero).subscribe({
      next: (createdHero) => {
        this.isAddModalOpen = false;
        this.messageService.add(`${createdHero.name} was added to your roster.`);
      },
      error: (error: unknown) => {
        console.error('Unable to add hero.', error);
        this.messageService.add('Could not add the hero. Please try again.', 'error');
      },
    });
  }
}
