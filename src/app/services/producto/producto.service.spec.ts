import { TestBed, inject } from '@angular/core/testing';

import { ProductoService } from './producto.service';

describe('ProductoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoService]
    });
  });

  it('should ...', inject([ProductoService], (service: ProductoService) => {
    expect(service).toBeTruthy();
  }));
});
