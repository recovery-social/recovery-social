import { TestBed } from '@angular/core/testing';

import { Erc725inspectService } from './erc725inspect.service';

describe('Erc725inspectService', () => {
  let service: Erc725inspectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Erc725inspectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
