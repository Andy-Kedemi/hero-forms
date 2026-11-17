import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';

import { Hero } from '../../hero';
import { HeroService } from '../hero.service';
import { HeroDetailModalComponent } from '../hero-detail-modal/hero-detail-modal';

type ViewMode = 'grid' | 'list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, HeroDetailModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private readonly heroService = inject(HeroService);

  // undefined while loading, Hero[] once loaded (empty array on error)
  readonly heroes = toSignal<Hero[]>(
    this.heroService.getTopHeroes(6).pipe(catchError(() => of([] as Hero[]))),
    { initialValue: undefined }
  );

  readonly view = signal<ViewMode>('grid');
  readonly selectedHero = signal<Hero | null>(null);
}
