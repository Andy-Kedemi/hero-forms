import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Hero, NewHero } from '../../hero';

@Component({
  selector: 'app-hero-create-modal',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './hero-create-modal.html',
})
export class HeroCreateModalComponent {
  @Input() open = false;
  @Output() saved = new EventEmitter<NewHero>();
  @Output() closed = new EventEmitter<void>();

  step: 'details' | 'review' = 'details';
  model: NewHero = this.emptyHero();

  submitDetails(): void {
    this.step = 'review';
  }

  editDetails(): void {
    this.step = 'details';
  }

  saveHero(): void {
    this.saved.emit({ ...this.model, searchCount: 0 });
    this.reset();
  }

  close(): void {
    this.reset();
    this.closed.emit();
  }

  private reset(): void {
    this.model = this.emptyHero();
    this.step = 'details';
  }

  private emptyHero(): NewHero {
    return { name: '', power: '', alterEgo: '', message: '', searchCount: 0 };
  }
}
