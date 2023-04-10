import { TestBed } from '@angular/core/testing';

import { ApproviService } from './approvi.service';

describe('ApproviService', () => {
  let service: ApproviService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproviService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
