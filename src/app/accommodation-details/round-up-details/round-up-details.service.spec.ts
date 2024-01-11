import { TestBed } from '@angular/core/testing';

import { RoundUpDetailsService } from './round-up-details.service';

describe('RoundUpDetailsService', () => {
  let service: RoundUpDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoundUpDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
