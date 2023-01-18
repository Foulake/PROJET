import { TestBed } from '@angular/core/testing';

import { CategorieFournisseurService } from './categorie-fournisseur.service';

describe('CategorieFournisseurService', () => {
  let service: CategorieFournisseurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieFournisseurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
