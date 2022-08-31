import { TestBed } from '@angular/core/testing';

import { RecoveryserviceService } from './recoveryservice.service';

describe('RecoveryserviceService', () => {
  let service: RecoveryserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
