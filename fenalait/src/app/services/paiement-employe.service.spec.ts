import { TestBed } from '@angular/core/testing';

import { PaiementEmployeService } from './paiement-employe.service';

describe('PaiementEmployeService', () => {
  let service: PaiementEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaiementEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
