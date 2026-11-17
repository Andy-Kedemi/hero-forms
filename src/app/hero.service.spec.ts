import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('saves a new hero in the shared in-memory roster', async () => {
    const hero = await firstValueFrom(
      service.addHero({
        name: 'Star Sentinel',
        alterEgo: 'Sam Lee',
        power: 'Light manipulation',
        message: 'Keep looking up.',
      }),
    );
    const heroes = await firstValueFrom(service.getHeroes());

    expect(hero.id).toBe(21);
    expect(heroes).toContainEqual(expect.objectContaining({
      id: 21,
      name: 'Star Sentinel',
      alterEgo: 'Sam Lee',
      power: 'Light manipulation',
      message: 'Keep looking up.',
    }));
  });

  it('updates popularity when heroes are searched', async () => {
    const before = await firstValueFrom(service.getHeroes());
    const heroId = before.find((item) => item.name === 'Celeritas')?.id;
    expect(heroId).toBeDefined();

    await firstValueFrom(service.searchHeroes('celeritas'));
    const after = await firstValueFrom(service.getHeroes());
    const searchedHero = after.find((item) => item.id === heroId);

    expect(searchedHero?.searchCount).toBe((before.find((item) => item.id === heroId)?.searchCount ?? 0) + 1);
  });
});
