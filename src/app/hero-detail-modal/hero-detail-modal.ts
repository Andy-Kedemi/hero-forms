import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hero } from '../../hero';

interface PowerTheme {
  header: string;
  accent: string;
  avatar: string;
  card: string;
  label: string;
  badge: string;
  message: string;
  messageLabel: string;
  button: string;
}

const POWER_THEMES: readonly PowerTheme[] = [
  {
    header: 'bg-red-700',
    accent: 'bg-red-400/10',
    avatar: 'bg-red-500/30',
    card: 'border-red-200 bg-red-50',
    label: 'text-red-700',
    badge: 'bg-red-100 text-red-800',
    message: 'border-red-200 bg-red-50',
    messageLabel: 'text-red-700',
    button: 'bg-red-600 hover:bg-red-700 focus-visible:outline-red-600',
  },
  {
    header: 'bg-amber-700',
    accent: 'bg-amber-400/10',
    avatar: 'bg-amber-500/30',
    card: 'border-amber-200 bg-amber-50',
    label: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-800',
    message: 'border-amber-200 bg-amber-50',
    messageLabel: 'text-amber-700',
    button: 'bg-amber-600 hover:bg-amber-700 focus-visible:outline-amber-600',
  },
  {
    header: 'bg-sky-700',
    accent: 'bg-sky-400/10',
    avatar: 'bg-sky-500/30',
    card: 'border-sky-200 bg-sky-50',
    label: 'text-sky-700',
    badge: 'bg-sky-100 text-sky-800',
    message: 'border-sky-200 bg-sky-50',
    messageLabel: 'text-sky-700',
    button: 'bg-sky-600 hover:bg-sky-700 focus-visible:outline-sky-600',
  },
  {
    header: 'bg-violet-700',
    accent: 'bg-violet-400/10',
    avatar: 'bg-violet-500/30',
    card: 'border-violet-200 bg-violet-50',
    label: 'text-violet-700',
    badge: 'bg-violet-100 text-violet-800',
    message: 'border-violet-200 bg-violet-50',
    messageLabel: 'text-violet-700',
    button: 'bg-violet-600 hover:bg-violet-700 focus-visible:outline-violet-600',
  },
  {
    header: 'bg-indigo-700',
    accent: 'bg-indigo-400/10',
    avatar: 'bg-indigo-500/30',
    card: 'border-indigo-200 bg-indigo-50',
    label: 'text-indigo-700',
    badge: 'bg-indigo-100 text-indigo-800',
    message: 'border-indigo-200 bg-indigo-50',
    messageLabel: 'text-indigo-700',
    button: 'bg-indigo-600 hover:bg-indigo-700 focus-visible:outline-indigo-600',
  },
  {
    header: 'bg-emerald-700',
    accent: 'bg-emerald-400/10',
    avatar: 'bg-emerald-500/30',
    card: 'border-emerald-200 bg-emerald-50',
    label: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800',
    message: 'border-emerald-200 bg-emerald-50',
    messageLabel: 'text-emerald-700',
    button: 'bg-emerald-600 hover:bg-emerald-700 focus-visible:outline-emerald-600',
  },
];

@Component({
  selector: 'app-hero-detail-modal',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './hero-detail-modal.html',
})
export class HeroDetailModalComponent {
  @Input() hero: Hero | null = null;
  @Output() closed = new EventEmitter<void>();

  powerTheme(power: string): PowerTheme {
    const normalizedPower = power.toLocaleLowerCase();
    const semanticTheme =
      /fire|heat|lava|explos/.test(normalizedPower) ? 0
        : /electric|lightning|energy/.test(normalizedPower) ? 1
          : /speed|wind|air|flight/.test(normalizedPower) ? 2
            : /magnet|metal|gravity/.test(normalizedPower) ? 3
              : /intelligen|mind|psychic|telepath/.test(normalizedPower) ? 4
                : /elastic|strength|nature|plant/.test(normalizedPower) ? 5
                  : -1;

    if (semanticTheme >= 0) {
      return POWER_THEMES[semanticTheme];
    }

    const hash = [...normalizedPower].reduce(
      (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
      0,
    );
    return POWER_THEMES[hash % POWER_THEMES.length];
  }
}
