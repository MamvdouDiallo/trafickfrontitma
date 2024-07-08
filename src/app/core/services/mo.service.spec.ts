import { TestBed } from '@angular/core/testing';

import { MoService } from './mo.service';

describe('MoService', () => {
  let service: MoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
