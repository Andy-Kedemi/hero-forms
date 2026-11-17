import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MessageService } from './message';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds and dismisses a typed toast message', () => {
    service.add('Hero added.', 'success');

    const [message] = service.messages();
    expect(message.text).toBe('Hero added.');
    expect(message.kind).toBe('success');

    service.dismiss(message.id);
    expect(service.messages()).toEqual([]);
  });

  it('automatically removes toast messages after five seconds', () => {
    vi.useFakeTimers();
    try {
      service.add('Saved.', 'success');

      vi.advanceTimersByTime(5000);

      expect(service.messages()).toEqual([]);
    } finally {
      service.clear();
      vi.useRealTimers();
    }
  });
});
