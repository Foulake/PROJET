import { TestBed } from '@angular/core/testing';

import { HttpIntersepterService } from './http-intersepter.service';

describe('HttpIntersepterService', () => {
  let service: HttpIntersepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpIntersepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
