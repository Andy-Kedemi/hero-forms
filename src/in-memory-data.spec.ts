import { TestBed } from '@angular/core/testing';
import { InMemoryDataService } from './in-memory-data';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide heroes with profile data and optional messages', () => {
    const { heroes } = service.createDb();

    expect(heroes.length).toBeGreaterThan(0);
    expect(heroes.every((hero) => hero.name && hero.power && hero.alterEgo)).toBe(true);
    expect(heroes.some((hero) => hero.message)).toBe(true);
  });

  it('should generate an id above the existing heroes', () => {
    expect(service.genId(service.createDb().heroes)).toBe(21);
    expect(service.genId([])).toBe(11);
  });
});
