import { TestBed } from '@angular/core/testing';

import { LocaliteService } from './localite.service';

describe('LocaliteService', () => {
  let service: LocaliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
function beforeEach(arg0: () => void) {
  throw new Error('Function not implemented.');
}

function expect(service: LocaliteService) {
  throw new Error('Function not implemented.');
}

