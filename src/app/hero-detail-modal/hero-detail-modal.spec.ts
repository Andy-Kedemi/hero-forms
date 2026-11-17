import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero } from '../../hero';
import { HeroDetailModalComponent } from './hero-detail-modal';

describe('HeroDetailModalComponent', () => {
  let component: HeroDetailModalComponent;
  let fixture: ComponentFixture<HeroDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('hero', new Hero(1, 'Dynama', 'Electricity'));
    fixture.detectChanges();
  });

  it('colors the modal cards and header according to the hero power', () => {
    const header = fixture.nativeElement.querySelector('[role="dialog"] > div') as HTMLElement;
    const powerCard = fixture.nativeElement.querySelector('.grid > div') as HTMLElement;

    expect(header.classList).toContain('bg-amber-700');
    expect(powerCard.classList).toContain('border-amber-200');

    fixture.componentRef.setInput('hero', new Hero(2, 'Tornado', 'Wind control'));
    fixture.detectChanges();

    expect(header.classList).toContain('bg-sky-700');
    expect(powerCard.classList).toContain('border-sky-200');
  });

  it('uses the same theme consistently for unrecognized powers', () => {
    const firstTheme = component.powerTheme('Cosmic resonance');
    const secondTheme = component.powerTheme('Cosmic resonance');

    expect(firstTheme).toEqual(secondTheme);
    expect(firstTheme.header).toMatch(/^bg-/);
  });
});
