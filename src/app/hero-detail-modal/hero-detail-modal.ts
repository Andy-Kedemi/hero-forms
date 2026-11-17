import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hero } from '../../hero';

@Component({
  selector: 'app-hero-detail-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './hero-detail-modal.html',
})
export class HeroDetailModalComponent {
  @Input() hero: Hero | null = null;
  @Output() closed = new EventEmitter<void>();
}
