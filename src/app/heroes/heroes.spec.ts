import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Hero } from '../../hero';
import { MessageService } from '../../message';
import { HeroService } from '../hero.service';
import { HeroesComponent } from './heroes';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters heroes by name, alter ego, or power without regard to case', () => {
    const heroes = [
      new Hero(1, 'Star Sentinel', 'Light manipulation', 'Sam Lee'),
      new Hero(2, 'Night Watch', 'Shadow control', 'Alex Morgan'),
    ];

    component.search('  SAM LEE ');

    expect(component.filterHeroes(heroes)).toEqual([heroes[0]]);
  });

  it('adds a hero to the roster and closes the add modal', async () => {
    const heroService = TestBed.inject(HeroService);
    component.isAddModalOpen = true;

    component.addHero({
      name: 'Star Sentinel',
      alterEgo: 'Sam Lee',
      power: 'Light manipulation',
      message: 'Keep looking up.',
    });

    const heroes = await firstValueFrom(heroService.getHeroes());
    expect(heroes.some((hero) => hero.name === 'Star Sentinel')).toBe(true);
    expect(component.isAddModalOpen).toBe(false);
    expect(TestBed.inject(MessageService).messages()[0].text).toBe(
      'Star Sentinel was added to your roster.',
    );
    TestBed.inject(MessageService).clear();
  });

  it('shows an error toast and keeps the form open when saving fails', () => {
    const heroService = TestBed.inject(HeroService);
    const messageService = TestBed.inject(MessageService);
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(heroService, 'addHero').mockReturnValue(
      throwError(() => new Error('Save failed')),
    );
    component.isAddModalOpen = true;

    component.addHero({
      name: 'Star Sentinel',
      alterEgo: 'Sam Lee',
      power: 'Light manipulation',
      message: 'Keep looking up.',
    });

    expect(component.isAddModalOpen).toBe(true);
    expect(messageService.messages()[0]).toEqual(
      expect.objectContaining({
        text: 'Could not add the hero. Please try again.',
        kind: 'error',
      }),
    );
    messageService.clear();
  });
});
