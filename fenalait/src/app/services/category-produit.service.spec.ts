import { TestBed } from '@angular/core/testing';

import { CategoryProduitService } from './category-produit.service';

describe('CategoryProduitService', () => {
  let service: CategoryProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
