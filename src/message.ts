import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: number;
  text: string;
  kind: ToastKind;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  readonly messages = signal<ToastMessage[]>([]);
  private nextId = 0;
  private readonly timers = new Map<number, ReturnType<typeof setTimeout>>();

  add(text: string, kind: ToastKind = 'success'): void {
    const id = this.nextId++;
    this.messages.update((messages) => [...messages, { id, text, kind }]);
    this.timers.set(id, setTimeout(() => this.dismiss(id), 5000));
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.messages.update((messages) => messages.filter((message) => message.id !== id));
  }

  clear(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
    this.messages.set([]);
  }
}
