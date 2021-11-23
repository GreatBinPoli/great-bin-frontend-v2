import { TestBed } from '@angular/core/testing';

import { ListerfilterService } from './listerfilter.service';

describe('ListerfilterService', () => {
  let service: ListerfilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListerfilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
