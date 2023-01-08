import { TestBed } from '@angular/core/testing';

import { AplicationGuard } from './aplication.guard';

describe('AplicationGuard', () => {
  let guard: AplicationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AplicationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
